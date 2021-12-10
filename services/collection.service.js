const matter = require("gray-matter");
const fs = require("fs");
const path = require("path");

const COLLECTION_PATH = "cms/collections";

class CollectionService {
  name = "";

  constructor(collectionName) {
    this.name = collectionName;
  }

  getAllItems(stripExtension = true) {
    const itemize = (path) => ({
      label: stripExtension ? path.replace(/\.md?$/, "") : path,
      url: `${this.getCollectionPath()}/${path}`,
    });
    const items = fs
      .readdirSync(this.getCollectionPath())
      .map((path) => itemize(path));
    console.log(items);

    return items;
  }

  getCollectionPath() {
    return path.resolve(
      `${CollectionService.getRootCollectionPath()}/${this.name}`
    );
  }

  getItem(slug) {
    const url = `${this.getCollectionPath()}/${slug}.md`;
    const { content, data } = matter(fs.readFileSync(url, "utf8"));
    return { body: content, meta: data };
  }

  static getRootCollectionPath() {
    return path.resolve(process.cwd(), COLLECTION_PATH);
  }
}

export default CollectionService;
