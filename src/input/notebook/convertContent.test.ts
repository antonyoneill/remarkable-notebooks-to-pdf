import convertContent from "./convertContent";

describe("convertContent", () => {
  it("maps pages correctly", () => {
    const context = {
      notebookId: "notebook-id",
      baseDir: "/",
      outputDir: "/out",
    };
    const input = {
      pages: ["page-id-1", "page-id-2"],
    };

    const output = convertContent(context, input);

    expect(output).toMatchObject({
      pages: ["/notebook-id/page-id-1.rm", "/notebook-id/page-id-2.rm"],
    });
  });
});
