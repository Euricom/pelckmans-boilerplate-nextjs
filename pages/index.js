import Head from "next/head";
import collectionService from '../services/collection.service';
import styles from "../styles/Home.module.css";

export default function Home({ project }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated with @euricom/pelckmans-cli" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welkom!</h1>
        <h3>Deze website is van het type *{project.type} met theme [
          {project.theme}]</h3>
        <p>Bezoek <a href="/admin/index.html">/admin</a> om content toe te voegen! <br/>
        Done? Dan zie je hier de oplijsting: </p>
        {/*TODO:: make dynamic */}
          <div className={styles.card}>POST 1</div>
      </main>

    </div>
  );
}

export async function getStaticProps() {
  const project = {
    type: process.env.PROJECT_TYPE || "*NULL*",
    theme: process.env.PROJECT_THEME || "*NULL*",
  };
  return {
    props: {
      project,
    },
  };
}
