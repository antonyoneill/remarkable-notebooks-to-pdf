import Args from "./types/args";
import getEntries from "./input/entry/getEntries";
import getEntriesTree from "./input/entry/getEntriesTree";
import flattenTree from "./process/flattenTree";
import EntryConversionContext from "./types/EntryConversionContext";
import generatePdf from "./output/generatePdf";

const Converter = async (args: Args): Promise<void> => {
  const notebooks = await getEntries(args.inputDir);

  const context: EntryConversionContext = {
    baseDir: args.inputDir,
    outputDir: args.outputDir,
    templateDir: args.templateDir,
  };

  const tree = getEntriesTree(context, notebooks);

  const documents = flattenTree(context, tree);

  const pdfPasswords = args.pdfPassword.reduce((acc, entry) => {
    const [key, value] = entry.split("=");
    acc[key] = value;
    return acc;
  }, {});

  documents.forEach((document) => generatePdf(context, document, pdfPasswords));
};

export default Converter;
