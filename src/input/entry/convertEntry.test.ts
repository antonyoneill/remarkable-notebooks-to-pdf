import RemarkableMetadata from "../../types/RemarkableMetadata";
import convertEntry from "./convertEntry";

import * as mockfs from "mock-fs";

describe("convertEntry", () => {
  const context = {
    baseDir: "/",
    outputDir: "/out",
    templateDir: "/templates",
  };
  afterAll(() => {
    mockfs.restore();
  });
  it("can convert a Document", () => {
    mockfs({
      "/notebook-id.content": JSON.stringify({
        pages: ["page-id-1", "page-id-2"],
      }),
      "/notebook-id.pagedata": JSON.stringify(`
      Template A
      Template B`),
    });

    const input: RemarkableMetadata = {
      id: "notebook-id",
      lastModified: "lastModified",
      parent: "parent",
      type: "DocumentType",
      visibleName: "Document Name",
    };

    const output = convertEntry(context, input);

    expect(output).toMatchObject({
      id: input.id,
      lastModified: input.lastModified,
      name: input.visibleName,
      parent: "parent",
    });
  });

  it("can convert a Collection", () => {
    const input: RemarkableMetadata = {
      id: "id",
      lastModified: "lastModified",
      parent: "parent",
      type: "CollectionType",
      visibleName: "Collection Name",
    };

    const output = convertEntry(context, input);

    expect(output).toMatchObject({
      id: input.id,
      lastModified: input.lastModified,
      parent: input.parent,
      visibleName: input.visibleName,
      children: {},
      type: "CollectionType",
    });
  });
});
