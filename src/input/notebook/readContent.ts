import Content from "../../types/Remarkable/Content";
import * as fs from "fs";
import * as path from "path";
import NotebookConversionContext from "../../types/NotebookConversionContext";

const readContent = (context: NotebookConversionContext): Content => {
  const pageDataPath = path.join(
    context.baseDir,
    `${context.notebookId}.content`
  );

  const contentString = fs.readFileSync(pageDataPath, { encoding: "utf-8" });

  return JSON.parse(contentString);
};

export default readContent;
