import Metadata from "../types/DocumentMetadata";
import RemarkableMetadata from "../types/RemarkableMetadata";
import DocumentMetadata from "../types/DocumentMetadata";
import CollectionMetadata from "../types/CollectionMetadata";
import convertMetadata from "./convertMetadata";

type MetadataTree = Array<DocumentMetadata | CollectionMetadata>;

const getMetadataTree = (input: RemarkableMetadata[]): MetadataTree => {
  const shallowTree = {};

  input.map(convertMetadata).forEach((metadata) => {
    if (metadata.parent === "") {
      shallowTree[metadata.id] = {
        ...metadata,
        ...shallowTree[metadata.id],
      };
      return;
    } else if (shallowTree[metadata.parent]) {
      shallowTree[metadata.parent].content.push(metadata);
    } else {
      shallowTree[metadata.parent] = { content: [metadata] };
    }
  });

  return Object.values(shallowTree);
};

export default getMetadataTree;
