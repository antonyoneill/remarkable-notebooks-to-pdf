import CollectionMetadata from "./CollectionMetadata";
import Notebook from "./Notebook";

type EntryTree = { [key: string]: EntryLeaf };

export type EntryLeaf = Notebook | CollectionMetadata;

export default EntryTree;
