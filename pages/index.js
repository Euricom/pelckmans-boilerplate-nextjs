import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Grid from '../components/Grid';
import Layout from '../components/Layout';
import Post from '../components/Post';
import CollectionService from '../services/collection.service';
import styles from '../styles/index.module.scss';

export default function Home({ project, posts, localProxyActive }) {
  const router = useRouter();
  const openPostHandler = (slug) => {
    router.push(`/posts/${slug}`);
  };

  const CmsInstructions = () => localProxyActive ? <div
   className="alert alert-info text-xl-center"
   role="alert">
    Bezoek <Link href="/admin/index.html">admin</Link> om content toe te
    voegen. Zodra dat gebeurt zie je hieronder de posts
    verschijnen.{' '}
  </div> : null;

  return (
   <div className={styles.container}>
     <Head>
       <title>Create Next App</title>
       <meta
        name="description"
        content="Generated with @euricom/pelckmans-cli"
       />
       <link
        rel="icon"
        href="/favicon.ico"/>
     </Head>
     <Layout>
       <main className={styles.main}>
         <section>
           <h2>
             Deze website is van het type {project.type} met theme {project.theme}
           </h2>
         </section>
         <section><CmsInstructions/></section>
         <section>
           <Grid style={{ maxWidth: '900px', margin: 'auto' }}>
             {posts.map(
              ({ body, filename, meta }, idx) => (
               <Post
                key={idx}
                meta={meta}
                onClick={() => openPostHandler(filename)}>
               </Post>
              )
             )}
           </Grid>
         </section>

       </main>
     </Layout>
   </div>
  );
}

export async function getStaticProps() {
  const postsCollection = new CollectionService('posts');
  const posts = postsCollection.getAllItems();

  const project = {
    type: process.env.PROJECT_TYPE || '*NULL*',
    theme: process.env.PROJECT_THEME || '*NULL*'
  };
  return {
    props: {
      localProxyActive: !!process.env.LOCAL_PROXY,
      project,
      posts
    }
  };
}
