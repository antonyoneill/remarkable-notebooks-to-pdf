import RemarkableMetadata from "../../types/RemarkableMetadata";
import convertEntry from "./convertEntry";
import EntryConversionContext from "../../types/EntryConversionContext";
import EntryTree from "../../types/EntryTree";

const getEntriesTree = (
  context: EntryConversionContext,
  input: RemarkableMetadata[]
): EntryTree =>
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
