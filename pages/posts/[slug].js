import { useRouter } from 'next/router'
import fs from 'fs';
import { join } from 'path';

const POSTS_PATH = join(process.cwd(), 'cms', 'collections', 'posts');

const Post = (data) => {
  console.log(data);
  const router = useRouter()
  const { slug } = router.query

  return <article>Post: {slug}</article>
}

export async function getStaticProps({ params }) {
  //TODO:: read and convert .md files to content
  const post = {title: 'testing title'}

  return { props: { post } }
}


export const getStaticPaths = async () => {
  const paths = fs
   .readdirSync(POSTS_PATH)
   // Remove file extensions for page paths
   .map((path) => path.replace(/\.md?$/, ''))
   .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Post
