import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import CollectionService from "../services/collection.service";
import { useRouter } from "next/router";


// TODO :: Add blog layout (bootstrap)
// TODO :: Beheer knop (CMS) ENKEL tonen als je lokaal draait (proxy)
export default function Home({ project, posts, localProxyActive}) {
  const router = useRouter();
  const openPostDetail = (slug) => {
    router.push(`/posts/${slug}`);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generated with @euricom/pelckmans-cli"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>
          Deze website is van het type {project.type} met theme
          {project.theme}
        </h3>
        {localProxyActive ? <p>
          Bezoek <Link href="/admin/index.html">/admin</Link> om content toe te
          voegen. <br /> Zodra dat gebeurt zie je hieronder de posts
          verschijnen.{" "}
        </p> : null}
        {posts.map(
          (
            { body, filename, meta: { layout, title, slug, date, thumbnail } },
            idx
          ) => (
            <div
              key={idx}
              className={styles.card}
              onClick={() => openPostDetail(filename)}
            >
              {title}
            </div>
          )
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const postsCollection = new CollectionService("posts");
  const posts = postsCollection.getAllItems();

  const project = {
    type: process.env.PROJECT_TYPE || "*NULL*",
    theme: process.env.PROJECT_THEME || "*NULL*",
  };
  return {
    props: {
      localProxyActive: !!process.env.LOCAL_PROXY,
      project,
      posts,
    },
  };
}
