import Args from "./types/args";
import getNotebooks from "./input/getNotebooks";

const Converter = async (args: Args): Promise<void> => {
  const notebooks = await getNotebooks(args.inputDir);

  console.log(notebooks);
};

export default Converter;
