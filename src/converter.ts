import Args from "./types/args";
import getEntries from "./input/entry/getEntries";
import getEntriesTree from "./input/entry/getEntriesTree";

const Converter = async (args: Args): Promise<void> => {
  const notebooks = await getEntries(args.inputDir);

  const tree = getEntriesTree(notebooks);

  console.log(tree);
};

export default Converter;
