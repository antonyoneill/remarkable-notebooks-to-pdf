import Args from "./types/args";
import getEntries from "./input/entry/getEntries";
import getEntriesTree from "./input/entry/getEntriesTree";
import flattenTree from "./process/flattenTree";
import EntryConversionContext from "./types/EntryConversionContext";

const Converter = async (args: Args): Promise<void> => {
  const notebooks = await getEntries(args.inputDir);

  const context: EntryConversionContext = { baseDir: args.inputDir };

  const tree = getEntriesTree(context, notebooks);

  const documents = flattenTree(context, tree);

  console.log(JSON.stringify(documents, undefined, 1));
};

export default Converter;
