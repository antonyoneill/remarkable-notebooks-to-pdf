import DocumentMetadata from "./DocumentMetadata";
import CollectionMetadata from "./CollectionMetadata";

type EntryTree = { [key: string]: EntryLeaf };

export type EntryLeaf = DocumentMetadata | CollectionMetadata;

export default EntryTree;
