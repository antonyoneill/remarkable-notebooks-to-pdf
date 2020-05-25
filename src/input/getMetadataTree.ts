import RemarkableMetadata from "../types/RemarkableMetadata";
import DocumentMetadata from "../types/DocumentMetadata";
import CollectionMetadata from "../types/CollectionMetadata";
import convertMetadata from "./convertMetadata";

type MetadataTree = { [key: string]: DocumentMetadata | CollectionMetadata };

const getMetadataTree = (input: RemarkableMetadata[]): MetadataTree =>
  input.map(convertMetadata).reduce((acc, metadata) => {
    if (metadata.parent === "") {
      acc[metadata.id] = {
        ...metadata,
        ...acc[metadata.id],
      };
    } else {
      if (acc[metadata.parent]) {
        acc[metadata.parent].content[metadata.id] = {
          ...metadata,
          ...acc[metadata.id],
        };
      } else {
        acc[metadata.parent] = {
          content: { [metadata.id]: { ...metadata, ...acc[metadata.id] } },
        };
      }

      delete acc[metadata.id];
    }

    return acc;
  }, {});

export default getMetadataTree;
