import RemarkableMetadata from "./RemarkableMetadata";
import { EntryLeaf } from "./EntryTree";

interface CollectionMetadata extends RemarkableMetadata {
  children: { [key: string]: EntryLeaf };
  type: "CollectionType";
}

export const isCollectionMetadata = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: CollectionMetadata | any
): obj is CollectionMetadata => {
  return obj.type === "CollectionType";
};

export default CollectionMetadata;
