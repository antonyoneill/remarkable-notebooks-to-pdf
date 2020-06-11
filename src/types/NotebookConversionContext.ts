import EntryConversionContext from "./EntryConversionContext";

interface NotebookConversionContext extends EntryConversionContext {
  notebookId: string;
}

export default NotebookConversionContext;
