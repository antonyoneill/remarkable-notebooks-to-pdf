import * as path from "path";
import NotebookConversionContext from "../../types/NotebookConversionContext";
import NotebookContent from "../../types/NotebookContent";
import Content from "../../types/Remarkable/Content";

const convertContent = (
  context: NotebookConversionContext,
  input: Content
): NotebookContent => ({
  pages: input.pages.map((pageId) =>
    path.join(context.baseDir, context.notebookId, `${pageId}.rm`)
  ),
});

export default convertContent;
