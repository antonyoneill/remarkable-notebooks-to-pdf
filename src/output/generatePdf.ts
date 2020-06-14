import EntryConversionContext from "../types/EntryConversionContext";
import FlattenedDocument from "../types/FlattenedDocument";
import * as fs from "fs";
import * as path from "path";
import convertToSvg from "./convertToSvg";
import * as PDFDocument from "pdfkit";
import * as SVGtoPDF from "svg-to-pdfkit";

const getPdfPassword = (pdfPasswords, path) => {
  const pdfPasswordKey = Object.keys(pdfPasswords).find((key) =>
    path.match(key)
  );

  if (pdfPasswordKey) {
    return pdfPasswords[pdfPasswordKey];
  }

  return undefined;
};

const generatePdf = (
  context: EntryConversionContext,
  document: FlattenedDocument,
  pdfPasswords: { [pathMatch: string]: string }
): void => {
  const outputPath = path.join(context.outputDir, document.outputPath);
  const temporaryFolder = path.join(
    context.outputDir,
    "temp",
    document.outputPath
  );

  fs.mkdirSync(temporaryFolder, { recursive: true });

  const pdfOptions: any = {
    autoFirstPage: false,
    size: [1050, 1400],
    margin: 0,
    pdfVersion: "1.7",
    info: {
      Title: document.name,
      ModDate: new Date(parseInt(document.lastModified, 10) * 1),
    },
    userPassword: getPdfPassword(pdfPasswords, document.outputPath),
  };

  // Collapse each svg into pdf
  const pdf = new PDFDocument(pdfOptions);

  fs.mkdirSync(path.parse(outputPath).dir, { recursive: true });

  const writeStream = fs.createWriteStream(`${outputPath}.pdf`);
  const pdfStream = pdf.pipe(writeStream);

  const resultingSvgs = convertToSvg(temporaryFolder, document);

  resultingSvgs.forEach((svgFile, pageIndex) => {
    pdf.addPage();
    if (document.pages[pageIndex].template) {
      pdf.image(document.pages[pageIndex].template, {
        fit: [1050, 1400],
      });
    }

    const svg = fs.readFileSync(svgFile, { encoding: "utf-8" });
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
