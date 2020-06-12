import RemarkableMetadata from "./RemarkableMetadata";
import NotebookContent from "./NotebookContent";

interface DocumentMetadata extends RemarkableMetadata {
  content: NotebookContent;
  type: "DocumentType";
}

export const isDocumentMetadata = (
  obj: Partial<DocumentMetadata>
): obj is DocumentMetadata => {
  return obj.type === "DocumentType";
};

export default DocumentMetadata;
