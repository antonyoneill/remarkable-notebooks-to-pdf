import RemarkableMetadata from "../../types/RemarkableMetadata";
import CollectionMetadata from "../../types/CollectionMetadata";
import getContent from "../notebook/content/getContent";
import EntryConversionContext from "../../types/EntryConversionContext";
import Notebook from "../../types/Notebook";
import getNotebook from "../notebook/getNotebook";

const convertEntry = (
  context: EntryConversionContext,
  input: RemarkableMetadata
): Notebook | CollectionMetadata => {
  if (input.type === "CollectionType") {
    return {
      id: input.id,
      lastModified: input.lastModified,
      parent: input.parent,
      visibleName: input.visibleName,
      children: {},
      type: input.type,
    };
  } else if (input.type === "DocumentType") {
    return getNotebook(context, input);
  }
};

export default convertEntry;
