import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const POSTS_PATH = join(process.cwd(), 'cms', 'collections', 'posts');

const Post = ({ post: { body, meta } }) => {
  return <article>
    <h1>{meta.title}</h1>
    <h3>{meta.date}</h3>
    <img
     style={{ maxWidth: '300px' }}
     src={meta.thumbnail}
     alt={meta.title + ' thumbnail'}/>
    <section>
      {body}
    </section>
  </article>
}

export async function getStaticProps({ params }) {
  const fetchPostData = (url) => {
    return matter(fs.readFileSync(url, 'utf8'))
  }
  const { content: body, data: meta } = fetchPostData(`${POSTS_PATH}/${params.slug}.md`);

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
  const paths = fs
   .readdirSync(POSTS_PATH)
   // Remove file extensions for page paths
   .map((path) => path.replace(/\.md?$/, ''))
   .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  };
};

export default Post
