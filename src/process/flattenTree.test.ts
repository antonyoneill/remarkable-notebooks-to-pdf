import EntryTree from "../types/EntryTree";
import EntryConversionContext from "../types/EntryConversionContext";
import flattenTree from "./flattenTree";
import Notebook, { isNotebook } from "../types/Notebook";

describe("flattenTree", () => {
  const context: EntryConversionContext = {
    baseDir: "./__fixtures__",
    outputDir: "./output",
    templateDir: "./templates",
  };
  const input: EntryTree = {
    "folder-1": {
      id: "folder-1",
      children: {
        "nested-notebook-id": {
          id: "nested-notebook-id",
          lastModified: "" + new Date().getMilliseconds(),
          parent: "folder-1",
          name: "Nested Notebook",
          pages: [
            {
              source: "page-one.rm",
            },
          ],
        },
      },
      lastModified: "" + new Date().getMilliseconds(),
      parent: "",
      visibleName: "Folder",
      type: "CollectionType",
    },
    "notebook-1": {
      id: "notebook-1",
      pages: [],
      lastModified: "" + new Date().getMilliseconds(),
      parent: "",
      name: "Root Notebook",
    },
  };

  it("returns only notebooks", () => {
    const output: Notebook[] = flattenTree(context, input);

    expect(output).toHaveLength(2);
    expect(output.every(isNotebook)).toEqual(true);
  });

  it("Enriches the notebook to have a folder structure", () => {
    const output: Notebook[] = flattenTree(context, input);

    expect(output).toHaveLength(2);
    expect(output).toEqual([
      expect.objectContaining({
        outputPath: "Folder/Nested Notebook",
      }),
      expect.objectContaining({
        outputPath: "Root Notebook",
      }),
    ]);
  });
});
