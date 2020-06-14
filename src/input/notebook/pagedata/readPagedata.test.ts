import NotebookConversionContext from "../../../types/NotebookConversionContext";
import readPagedata from "./readPagedata";
describe("readPagedata", () => {
  it("returns an array of templates entries", () => {
    const context: NotebookConversionContext = {
      baseDir: "./__fixtures__",
      notebookId: "notebook-id",
      outputDir: "./out",
      templateDir: "./templates",
    };

    expect(readPagedata(context)).toEqual([
      "templates/P Grid small.png",
      "templates/P Grid small.png",
    ]);
  });
});
