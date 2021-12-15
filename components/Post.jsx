import React from 'react';
import ReactMarkdown from "react-markdown";
import styles from "./Post.module.scss";

const Post = ({children, meta: {date, layout, thumbnail, title}, onClick }) => {
  const dateTime = new Date(date).toLocaleTimeString("nl-BE", {year: 'numeric', month: 'numeric', day: 'numeric'})
  return (
   <div className={`${styles.Post} card`}>
       <div className="card-body">
         <h5 className="card-title">{title}</h5>
         <ReactMarkdown>{children}</ReactMarkdown>
         <a href="#" className="btn btn-primary" onClick={onClick}>READ</a>
         <p className="card-text"><small className="text-muted">{dateTime}</small></p>
       </div>
   </div>
  );
};

export default Post;
