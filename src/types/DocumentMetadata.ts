import RemarkableMetadata from "./RemarkableMetadata";

type DocumentMetadata = Omit<RemarkableMetadata, "type">;

export default DocumentMetadata;
