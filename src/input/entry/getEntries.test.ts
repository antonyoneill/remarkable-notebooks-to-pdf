import * as fs from "fs";
import getEntries from "./getEntries";
import { mocked } from "ts-jest/utils";
import * as glob from "glob";

jest.mock("glob");
jest.mock("fs");

describe("getEntries", () => {
  it("can find a single notebook, with a single page", async () => {
    mocked(glob).sync.mockReturnValue(["/single-page.metadata"]);
    mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify({
        deleted: false,
        lastModified: "1583160749000",
        metadatamodified: false,
        modified: false,
        parent: "",
        pinned: false,
        synced: false,
        type: "DocumentType",
        version: 1,
        visibleName: "Notebook Title",
      })
    );

    const notebooks = await getEntries("/");

    expect(notebooks).toHaveLength(1);
    expect(notebooks[0]).toMatchObject({
      id: "single-page",
      type: "DocumentType",
      visibleName: "Notebook Title",
    });
  });

  it("can find two notebooks", async () => {
    mocked(glob).sync.mockReturnValue([
      "/single-page.metadata",
      "/two-page.metadata",
    ]);
    mocked(fs.readFileSync).mockImplementation((path) => {
      if (path === "/single-page.metadata") {
        return JSON.stringify({
          deleted: false,
          lastModified: "1583160749000",
          metadatamodified: false,
          modified: false,
          parent: "",
          pinned: false,
          synced: false,
          type: "DocumentType",
          version: 1,
          visibleName: "One Page Notebook",
        });
      } else if (path === "/two-page.metadata") {
        return JSON.stringify({
          deleted: false,
          lastModified: "1583160749000",
          metadatamodified: false,
          modified: false,
          parent: "",
          pinned: false,
          synced: false,
          type: "DocumentType",
          version: 1,
          visibleName: "Two Pages Notebook",
        });
      } else {
        throw Error("Path not found");
      }
    });

    const notebooks = await getEntries("/");

    expect(notebooks).toHaveLength(2);

    expect(notebooks[0]).toMatchObject({
      id: "single-page",
      type: "DocumentType",
      visibleName: "One Page Notebook",
    });

    expect(notebooks[1]).toMatchObject({
      id: "two-page",
      type: "DocumentType",
      visibleName: "Two Pages Notebook",
    });
  });
});
