import Notebook from "./Notebook";

interface FlattenedDocument extends Notebook {
  outputPath: string;
}

export default FlattenedDocument;
