import * as mockfs from "mock-fs";
import readContent from "./readContent";

describe("readContent", () => {
  afterAll(() => {
    mockfs.restore();
  });
  it("reads the content from the file system", () => {
    const context = {
      baseDir: "/",
      notebookId: "notebook-id",
      outputDir: "/out",
      templateDir: "/templates",
    };

    const content = {
      pages: ["page-id-1", "page-id-2"],
    };

    mockfs({
      "/notebook-id.content": JSON.stringify(content),
    });

    const output = readContent(context);

    expect(output).toMatchObject(content);
  });
});
