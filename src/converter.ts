import Args from "./types/args";
import getEntries from "./input/entry/getEntries";
import getEntriesTree from "./input/entry/getEntriesTree";

const Converter = async (args: Args): Promise<void> => {
  const notebooks = await getEntries(args.inputDir);

  const tree = getEntriesTree({ baseDir: args.inputDir }, notebooks);

  console.log(JSON.stringify(tree, undefined, 1));
};

export default Converter;
