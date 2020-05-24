import * as fs from "fs";
import getNotebooks from "./getNotebooks";
import { mocked } from "ts-jest/utils";
import * as glob from "glob";

jest.mock("glob");
jest.mock("fs");

describe("getNotebooks", () => {
  it("can find a single notepad, with a single page", async () => {
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
        visibleName: "Notepad Title",
      })
    );

    const notebooks = await getNotebooks("/");

    expect(notebooks).toHaveLength(1);
    expect(notebooks[0]).toMatchObject({
      id: "single-page",
      type: "DocumentType",
      visibleName: "Notepad Title",
    });
  });

  it("can find two notepads", async () => {
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

    const notebooks = await getNotebooks("/");

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
