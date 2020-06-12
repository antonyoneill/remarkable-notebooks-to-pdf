import RemarkableMetadata from "./RemarkableMetadata";
import NotebookContent from "./NotebookContent";

interface DocumentMetadata extends RemarkableMetadata {
  content: NotebookContent;
  type: "DocumentType";
}

export const isDocumentMetadata = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: DocumentMetadata | any
): obj is DocumentMetadata => {
  return obj.type === "DocumentType";
};

export default DocumentMetadata;
