import RemarkableMetadata from "../../types/RemarkableMetadata";
import DocumentMetadata from "../../types/DocumentMetadata";
import CollectionMetadata from "../../types/CollectionMetadata";

const convertEntry = (
  input: RemarkableMetadata
): DocumentMetadata | CollectionMetadata => {
  if (input.type === "CollectionType") {
    return {
      id: input.id,
      lastModified: input.lastModified,
      parent: input.parent,
      visibleName: input.visibleName,
      children: {},
    };
  } else if (input.type === "DocumentType") {
    return {
      id: input.id,
      lastModified: input.lastModified,
      parent: input.parent,
      visibleName: input.visibleName,
    };
  }
};

export default convertEntry;
