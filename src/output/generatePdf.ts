import EntryConversionContext from "../types/EntryConversionContext";
import FlattenedDocument from "../types/FlattenedDocument";
import * as fs from "fs";
import * as path from "path";
import convertToSvg from "./convertToSvg";
import * as PDFDocument from "pdfkit";
import * as SVGtoPDF from "svg-to-pdfkit";

const generatePdf = (
  context: EntryConversionContext,
  document: FlattenedDocument
): void => {
  const outputPath = path.join(context.outputDir, document.outputPath);
  const temporaryFolder = path.join(
    context.outputDir,
    "temp",
    document.outputPath
  );

  fs.mkdirSync(temporaryFolder, { recursive: true });

  const svgFiles = convertToSvg(temporaryFolder, document);

  // Collapse each svg into pdf
  const pdf = new PDFDocument({
    autoFirstPage: false,
    size: [1050, 1400],
    margin: 0,
    info: {
      Title: document.name,
      ModDate: new Date(parseInt(document.lastModified, 10) * 1),
    },
  });

  fs.mkdirSync(path.parse(outputPath).dir, { recursive: true });

  const writeStream = fs.createWriteStream(`${outputPath}.pdf`);
  const pdfStream = pdf.pipe(writeStream);

  svgFiles.forEach((svgFile) => {
    const svg = fs.readFileSync(svgFile, { encoding: "utf-8" });
    pdf.addPage();
    SVGtoPDF(pdf, svg, 0, 0);
  });

  pdf.end();
  pdfStream.on("finish", function () {
    writeStream.end();
  });

  fs.rmdirSync(temporaryFolder, { recursive: true });

  // Extra:
  // Consider page backgrounds
};

export default generatePdf;
