import Args from "./types/args";
import getNotebooks from "./input/getNotebooks";
import getMetadataTree from "./input/getMetadataTree";

const Converter = async (args: Args): Promise<void> => {
  const notebooks = await getNotebooks(args.inputDir);

  const tree = getMetadataTree(notebooks);

  console.log(tree);
};

export default Converter;
