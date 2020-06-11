import RemarkableMetadata from "../../types/RemarkableMetadata";
import convertEntry from "./convertEntry";

describe("convertEntry", () => {
  it("can convert a Document", () => {
    const input: RemarkableMetadata = {
      id: "id",
      lastModified: "lastModified",
      parent: "parent",
      type: "DocumentType",
      visibleName: "Document Name",
    };

    const output = convertEntry(input);

    expect(output).toMatchObject({
      id: input.id,
      lastModified: input.lastModified,
      parent: input.parent,
      visibleName: input.visibleName,
    });
  });

  it("can convert a Collection", () => {
    const input: RemarkableMetadata = {
      id: "id",
      lastModified: "lastModified",
      parent: "parent",
      type: "CollectionType",
      visibleName: "Document Name",
    };

    const output = convertEntry(input);

    expect(output).toMatchObject({
      id: input.id,
      lastModified: input.lastModified,
      parent: input.parent,
      visibleName: input.visibleName,
      children: {},
    });
  });
});
