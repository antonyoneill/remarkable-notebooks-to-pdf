import RemarkableMetadata from "./RemarkableMetadata";
import DocumentMetadata from "./DocumentMetadata";

interface CollectionMetadata extends Omit<RemarkableMetadata, "type"> {
  content: { [key: string]: CollectionMetadata | DocumentMetadata };
}

export default CollectionMetadata;
