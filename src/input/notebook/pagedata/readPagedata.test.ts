import NotebookConversionContext from "../../../types/NotebookConversionContext";
import readPagedata from "./readPagedata";
describe("readPagedata", () => {
  it("returns an array of templates entries", () => {
    const context: NotebookConversionContext = {
      baseDir: "./__fixtures__",
      notebookId: "notebook-id",
      outputDir: "./out",
      templateDir: "./__templates__",
    };

    expect(readPagedata(context)).toEqual([
      "__templates__/P Grid small.png",
      "__templates__/P Grid small.png",
    ]);
  });
});
