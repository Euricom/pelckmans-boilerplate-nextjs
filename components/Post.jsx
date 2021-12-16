import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import CollectionService from '../services/collection.service';
import styles from './Post.module.scss';

const Post = ({ children, meta: { date, layout, thumbnail, title }, onClick }) => {
  const dateTime = new Date(date).toLocaleTimeString('nl-BE',
   { year: 'numeric', month: 'numeric', day: 'numeric'});

  return (
   <div className={`${styles.Post} card`} onClick={onClick}>
     <Image
      loader={CollectionService.getImagePath}
      className="card-img-top"
      src={thumbnail}
      unoptimized={true}
      alt="Picture of the author"
      width={500}
      height={300}
     />
     <div className="card-body">
       <h5 className="card-title">{title}</h5>
       <ReactMarkdown>{children}</ReactMarkdown>

       <p className="card-text">
         <small className="text-muted">{dateTime}</small>
       </p>
     </div>
   </div>
  );
};

export default Post;
