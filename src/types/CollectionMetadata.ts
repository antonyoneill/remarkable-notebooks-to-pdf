import RemarkableMetadata from "./RemarkableMetadata";
import DocumentMetadata from "./DocumentMetadata";

interface CollectionMetadata extends Omit<RemarkableMetadata, "type"> {
  children: { [key: string]: CollectionMetadata | DocumentMetadata };
}

export default CollectionMetadata;
