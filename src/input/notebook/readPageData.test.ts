import NotebookConversionContext from "../../types/NotebookConversionContext";
import readPageData from "./readPageData";
describe("readPageData", () => {
  it("returns an array of templates entries", () => {
    const context: NotebookConversionContext = {
      baseDir: "./__fixtures__",
      notebookId: "notebook-id",
      outputDir: "./out",
      templateDir: "./templates",
    };

    expect(readPageData(context)).toEqual(["P Grid small", "P Grid small"]);
  });
});
