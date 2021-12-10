import Head from "next/head";
import Link from 'next/link'
import styles from "../styles/Home.module.css";
import CollectionService from '../services/collection.service'

export default function Home({ project, posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated with @euricom/pelckmans-cli" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>Deze website is van het type {project.type} met theme
          {project.theme}</h3>
        <p>Bezoek <Link href="/admin/index.html">/admin</Link> om content toe te voegen! <br />
          Done? Dan zie je hier de oplijsting: </p>
        {/*TODO:: make dynamic */}
        {posts.map((post, idx) => <div key={idx} className={styles.card}>{post}</div>)}
      </main>

    </div>
  );
}

export async function getStaticProps() {
  const postsCollection = new CollectionService("posts");
  const posts = postsCollection.getAllItems()

  const project = {
    type: process.env.PROJECT_TYPE || "*NULL*",
    theme: process.env.PROJECT_THEME || "*NULL*",
  };
  return {
    props: {
      project,
      posts,
    },
  };
}
