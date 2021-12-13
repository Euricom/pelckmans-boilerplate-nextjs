import Image from "next/image";
import ReactMarkdown from "react-markdown";
import CollectionService from "../../services/collection.service";
import styles from "../../styles/Post.module.css";

export default function Post({ post: { body, meta } }) {
  return (
    <article>
      <h1>{meta.title}</h1>
      <h3>{meta.date}</h3>
      {meta && !!meta.thumbnail && (
        <div className={styles.thumbnail}>
          <Image
            width="100"
            height="100"
            layout="responsive"
            src={meta.thumbnail}
            alt={meta.title + " thumbnail"}
          />
        </div>
      )}
      <section>
        <ReactMarkdown>{body}</ReactMarkdown>
      </section>
    </article>
  );
}

export async function getStaticProps({ params }) {
  const postsCollection = new CollectionService("posts");
  const { body, meta } = postsCollection.getItem(params.slug);

  return {
    props: {
      post: {
        body,
        meta,
      },
    },
  };
}

export const getStaticPaths = async () => {
  const postsCollection = new CollectionService("posts");
  // fetch all slugs to pre-render the paths on build time
  const paths = postsCollection.getAllPaths();
  return {
    paths,
    fallback: false,
  };
};
