import getContent from "./getContent";
import * as mockfs from "mock-fs";

describe("getContent", () => {
  afterAll(() => {
    mockfs.restore();
  });
  it("reads the content file for a document", () => {
    const context = {
      baseDir: "/",
      notebookId: "notebook-id",
    };

    mockfs({
      "/notebook-id.content": JSON.stringify({
        pages: ["page-id-1", "page-id-2"],
      }),
    });

    const output = getContent(context);

    expect(output).toMatchObject({
      pages: ["/notebook-id/page-id-1.rm", "/notebook-id/page-id-2.rm"],
    });
  });
});
