import DocumentMetadata from "./DocumentMetadata";
import CollectionMetadata from "./CollectionMetadata";

type EntryTree = { [key: string]: DocumentMetadata | CollectionMetadata };

export default EntryTree;
