import RemarkableMetadata from "./RemarkableMetadata";
import DocumentMetadata from "./DocumentMetadata";

interface CollectionMetadata extends RemarkableMetadata {
  children: { [key: string]: CollectionMetadata | DocumentMetadata };
  type: "CollectionType";
}

export default CollectionMetadata;
