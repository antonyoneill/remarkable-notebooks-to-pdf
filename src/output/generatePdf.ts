import EntryConversionContext from "../types/EntryConversionContext";
import FlattenedDocument from "../types/FlattenedDocument";
import * as fs from "fs";
import * as path from "path";
import convertToSvg from "./convertToSvg";

const generatePdf = (
  context: EntryConversionContext,
  document: FlattenedDocument
): void => {
  const temporaryFolder = path.join(
    context.outputDir,
    "temp",
    document.outputPath
  );

  fs.mkdirSync(temporaryFolder, { recursive: true });

  const svgs = convertToSvg(temporaryFolder, document);

  // Collapse each svg into pdf

  // Extra:
  // Consider page backgrounds
};

export default generatePdf;
