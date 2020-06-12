import DocumentMetadata from "./DocumentMetadata";

interface FlattenedDocument extends DocumentMetadata {
  outputPath: string;
}

export default FlattenedDocument;
