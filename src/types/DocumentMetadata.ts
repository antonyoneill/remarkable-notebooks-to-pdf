import RemarkableMetadata from "./RemarkableMetadata";
import NotebookContent from "./NotebookContent";

interface DocumentMetadata extends Omit<RemarkableMetadata, "type"> {
  content: NotebookContent;
}

export default DocumentMetadata;
