import RemarkableMetadata from "../types/RemarkableMetadata";
import getMetadataTree from "./getMetadataTree";

describe("getMetadataTree", () => {
  it("can handle a simple notebook", () => {
    const input: RemarkableMetadata[] = [
      {
        id: "id",
        lastModified: "01234",
        parent: "",
        type: "DocumentType",
        visibleName: "Notebook",
      },
    ];

    const output = getMetadataTree(input);

    expect(output).toHaveLength(1);
    expect(output[0]).toMatchObject({ id: "id" });
  });

  it("can handle nested notebook", () => {
    const input: RemarkableMetadata[] = [
      {
        id: "notebook-id",
        lastModified: "01234",
        parent: "",
        type: "DocumentType",
        visibleName: "Root Notebook",
      },
      {
        id: "folder-id",
        lastModified: "01234",
        parent: "",
        type: "CollectionType",
        visibleName: "Folder",
      },
      {
        id: "nested-notebook-id",
        lastModified: "01234",
        parent: "folder-id",
        type: "DocumentType",
        visibleName: "Nested Notebook",
      },
    ];

    const output = getMetadataTree(input);

    expect(output).toHaveLength(2);
    expect(output).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "folder-id",
          content: [expect.objectContaining({ id: "nested-notebook-id" })],
        }),
        expect.objectContaining({ id: "notebook-id" }),
      ])
    );
  });
  it("can handle nested notebooks, when folder is after notebook", () => {
    const input: RemarkableMetadata[] = [
      {
        id: "notebook-id",
        lastModified: "01234",
        parent: "",
        type: "DocumentType",
        visibleName: "Root Notebook",
      },
      {
        id: "nested-notebook-id",
        lastModified: "01234",
        parent: "folder-id",
        type: "DocumentType",
        visibleName: "Nested Notebook",
      },
      {
        id: "folder-id",
        lastModified: "01234",
        parent: "",
        type: "CollectionType",
        visibleName: "Folder",
      },
    ];

    const output = getMetadataTree(input);

    expect(output).toHaveLength(2);
    expect(output).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "folder-id",
          content: [expect.objectContaining({ id: "nested-notebook-id" })],
        }),
        expect.objectContaining({ id: "notebook-id" }),
      ])
    );
  });
});
