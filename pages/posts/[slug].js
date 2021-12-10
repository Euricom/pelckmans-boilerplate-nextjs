import CollectionService from '../../services/collection.service';
import ReactMarkdown from 'react-markdown';

const Post = ({ post: { body, meta } }) => {
  return <article>
    <h1>{meta.title}</h1>
    <h3>{meta.date}</h3>
    <img
     style={{ maxWidth: '300px' }}
     src={meta.thumbnail}
     alt={meta.title + ' thumbnail'}/>
    <section>
      <ReactMarkdown>{body}</ReactMarkdown>
    </section>
  </article>
}

export async function getStaticProps({ params }) {
  const postsCollection = new CollectionService('posts')
  const { body, meta } = postsCollection.getItem(params.slug);

  return {
    props: {
      post: {
        body: body,
        meta: { ...meta, date: meta.date.toJSON() }
      }
    }
  }
}

export const getStaticPaths = async () => {
  const postsCollection = new CollectionService('posts')
  // fetch all slugs to pre-render the paths on build time
  const paths = postsCollection.getAllItems()
   .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  };
};

export default Post
