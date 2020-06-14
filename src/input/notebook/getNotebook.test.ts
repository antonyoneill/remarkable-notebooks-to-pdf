import getNotebook from "./getNotebook";
import DocumentMetadata from "../../types/Remarkable/DocumentMetadata";
import EntryConversionContext from "../../types/EntryConversionContext";

describe("getNotebook", () => {
  it("returns an enriched Notebook", () => {
    const context: EntryConversionContext = {
      baseDir: "__fixtures__",
      outputDir: "out",
      templateDir: "__templates__",
    };

    const metadata: DocumentMetadata = {
      id: "notebook-id",
      visibleName: "Sample",
      lastModified: "1591973108776",
      parent: "",
      type: "DocumentType",
    };

    const notebook = getNotebook(context, metadata);

    expect(notebook).toMatchObject({
      name: "Sample",
      lastModified: "1591973108776",
      pages: [
        {
          source: "__fixtures__/notebook-id/page-one-id.rm",
          template: "__templates__/P Grid small.png",
        },
        {
          source: "__fixtures__/notebook-id/page-two-id.rm",
          template: "__templates__/P Grid small.png",
        },
      ],
    });
  });
});
