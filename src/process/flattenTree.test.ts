import EntryTree from "../types/EntryTree";
import EntryConversionContext from "../types/EntryConversionContext";
import DocumentMetadata, {
  isDocumentMetadata,
} from "../types/DocumentMetadata";
import flattenTree from "./flattenTree";

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
          content: {
            pages: [],
          },
          lastModified: "" + new Date().getMilliseconds(),
          parent: "folder-1",
          visibleName: "Nested Notebook",
          type: "DocumentType",
        },
      },
      lastModified: "" + new Date().getMilliseconds(),
      parent: "",
      visibleName: "Folder",
      type: "CollectionType",
    },
    "notebook-1": {
      id: "notebook-1",
      content: {
        pages: [],
      },
      lastModified: "" + new Date().getMilliseconds(),
      parent: "",
      visibleName: "Root Notebook",
      type: "DocumentType",
    },
  };

  it("returns only documents", () => {
    const output: DocumentMetadata[] = flattenTree(context, input);

    expect(output).toHaveLength(2);
    expect(output.every(isDocumentMetadata)).toEqual(true);
  });

  it("Enriches the document to have a folder structure", () => {
    const output: DocumentMetadata[] = flattenTree(context, input);

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
