import RemarkableMetadata from "../types/RemarkableMetadata";
import getMetadataTree from "./getMetadataTree";

describe("getMetadataTree", () => {
  it("can handle a simple notebook", () => {
    const input: RemarkableMetadata[] = [
      {
        id: "notebook-id",
        lastModified: "01234",
        parent: "",
        type: "DocumentType",
        visibleName: "Notebook",
      },
    ];

    const output = getMetadataTree(input);

    expect(Object.keys(output)).toHaveLength(1);
    expect(output).toMatchObject({ "notebook-id": { id: "notebook-id" } });
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

    expect(Object.keys(output)).toHaveLength(2);
    expect(output).toMatchObject({
      "folder-id": expect.objectContaining({
        id: "folder-id",
        children: {
          "nested-notebook-id": expect.objectContaining({
            id: "nested-notebook-id",
          }),
        },
      }),
      "notebook-id": expect.objectContaining({ id: "notebook-id" }),
    });
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

    expect(Object.keys(output)).toHaveLength(2);
    expect(output).toMatchObject({
      "folder-id": expect.objectContaining({
        id: "folder-id",
        children: {
          "nested-notebook-id": expect.objectContaining({
            id: "nested-notebook-id",
          }),
        },
      }),
      "notebook-id": expect.objectContaining({ id: "notebook-id" }),
    });
  });

  it("can handle nested folders", () => {
    const input: RemarkableMetadata[] = [
      {
        id: "notebook-id",
        lastModified: "01234",
        parent: "",
        type: "DocumentType",
        visibleName: "Root Notebook",
      },
      {
        id: "root-folder",
        lastModified: "01234",
        parent: "",
        type: "CollectionType",
        visibleName: "Folder",
      },
      {
        id: "nested-notebook-id",
        lastModified: "01234",
        parent: "nested-folder",
        type: "DocumentType",
        visibleName: "Nested Notebook",
      },
      {
        id: "nested-folder",
        lastModified: "01234",
        parent: "root-folder",
        type: "CollectionType",
        visibleName: "Nested Folder",
      },
      {
        id: "root-folder",
        lastModified: "01234",
        parent: "",
        type: "CollectionType",
        visibleName: "Folder",
      },
    ];

    const output = getMetadataTree(input);

    expect(Object.keys(output)).toHaveLength(2);
    expect(output).toMatchObject({
      "root-folder": expect.objectContaining({
        id: "root-folder",
        children: {
          "nested-folder": expect.objectContaining({
            id: "nested-folder",
            children: {
              "nested-notebook-id": expect.objectContaining({
                id: "nested-notebook-id",
              }),
            },
          }),
        },
      }),
      "notebook-id": expect.objectContaining({ id: "notebook-id" }),
    });
  });
});
