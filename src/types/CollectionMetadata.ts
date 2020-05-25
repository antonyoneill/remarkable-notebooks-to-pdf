import RemarkableMetadata from "./RemarkableMetadata";
import DocumentMetadata from "./DocumentMetadata";

interface CollectionMetadata extends Omit<RemarkableMetadata, "type"> {
  content: Array<CollectionMetadata | DocumentMetadata>;
}

export default CollectionMetadata;
