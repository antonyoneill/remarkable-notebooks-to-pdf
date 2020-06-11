import convertContent from "./convertContent";
import NotebookConversionContext from "../../types/NotebookConversionContext";
import readContent from "./readContent";
import NotebookContent from "../../types/NotebookContent";

const getContent = (context: NotebookConversionContext): NotebookContent => {
  const content = readContent(context);

  return convertContent(context, content);
};

export default getContent;
