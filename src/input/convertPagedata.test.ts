import RemarkableMetadata from "../types/RemarkableMetadata";
import * as fs from "fs";
import { mocked } from "ts-jest/utils";

jest.mock("fs");

describe("readPageData", () => {
  it("reads the content file for a document", () => {
    const input: Partial<RemarkableMetadata> = {
      id: "notebook-id",
      type: "DocumentType",
    };

    mocked(fs.readFileSync).mockImplementation((file) => {
      if (file === "/notebook-id.content") {
        return JSON.stringify({
          pages: ["page-id-1", "page-id-2"],
        });
      }
    });

    const output = readPageData(input, "/");

    expect(output).toMatchObject({
      pages: ["/notebook-id/page-id-1"],
    });
  });
});
