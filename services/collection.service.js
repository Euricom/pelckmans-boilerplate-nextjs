const matter = require("gray-matter");
const fs = require("fs");
const path = require("path");

const COLLECTION_PATH = "cms/collections";

class CollectionService {
  name = "";

  constructor(collectionName) {
    this.name = collectionName;
  }
  getAllPaths() {
    const fileNames = fs.readdirSync(this.getCollectionPath());

    return fileNames.map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ""),
        },
      };
    });
  }
  getAllItems() {
    const items = fs.readdirSync(this.getCollectionPath()).map((path) => {
      return this.getItem(path.replace(/\.md?$/, ""));
    });

    return items;
  }

  getCollectionPath() {
    return path.resolve(
      `${CollectionService.getRootCollectionPath()}/${this.name}`
    );
  }

  getItem(slug) {
    const url = `${this.getCollectionPath()}/${slug}.md`;
    const { content, data: meta } = matter(fs.readFileSync(url, "utf8"));

    return {
      body: content,
      meta: { ...meta, date: meta.date.toJSON() },
      filename: `${slug}`,
    };
  }

  static getRootCollectionPath() {
    return path.resolve(process.cwd(), COLLECTION_PATH);
  }
}

export default CollectionService;
