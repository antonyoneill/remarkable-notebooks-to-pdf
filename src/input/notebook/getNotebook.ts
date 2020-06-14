import EntryConversionContext from "../../types/EntryConversionContext";
import Notebook from "../../types/Notebook";
import getContent from "./content/getContent";
import readPagedata from "./pagedata/readPagedata";
import RemarkableMetadata from "../../types/RemarkableMetadata";

const getNotebook = (
  context: EntryConversionContext,
  metadata: RemarkableMetadata
): Notebook => {
  const notebookContext = { ...context, notebookId: metadata.id };
  const content = getContent(notebookContext);
  const pageData = readPagedata(notebookContext);

  return {
    id: metadata.id,
    lastModified: metadata.lastModified,
    name: metadata.visibleName,
    parent: metadata.parent,
    pages: content.pages.map((page, pageIndex) => ({
      source: page,
      template: pageData[pageIndex],
    })),
  };
};

export default getNotebook;
