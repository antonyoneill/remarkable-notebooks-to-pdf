import RemarkableMetadata from "../../types/RemarkableMetadata";
import DocumentMetadata from "../../types/DocumentMetadata";
import CollectionMetadata from "../../types/CollectionMetadata";
import convertEntry from "./convertEntry";
import EntryConversionContext from "../../types/EntryConversionContext";

type MetadataTree = { [key: string]: DocumentMetadata | CollectionMetadata };

const getEntriesTree = (
  context: EntryConversionContext,
  input: RemarkableMetadata[]
): MetadataTree =>
  input
    .map((entry) => convertEntry(context, entry))
    .reduce((acc, metadata) => {
      if (metadata.parent === "") {
        acc[metadata.id] = {
          ...metadata,
          ...acc[metadata.id],
        };
      } else {
        if (acc[metadata.parent]) {
          acc[metadata.parent].children[metadata.id] = {
            ...metadata,
            ...acc[metadata.id],
          };
        } else {
          acc[metadata.parent] = {
            children: { [metadata.id]: { ...metadata, ...acc[metadata.id] } },
          };
        }

        delete acc[metadata.id];
      }

      return acc;
    }, {});

export default getEntriesTree;
