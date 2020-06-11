import Args from "./types/args";
import getNotebooks from "./input/getNotebooks";

const Converter = async (args: Args): Promise<void> => {
  // Get notebooks, as a tree
  const notebooks = await getNotebooks(args.inputDir);

  // Convert each notebook into a PDF

  console.log(notebooks);
};

export default Converter;
