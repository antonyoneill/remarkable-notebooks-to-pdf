import FlattenedDocument from "../types/FlattenedDocument";
import { execSync } from "child_process";
import * as fs from "fs";

const convertToSvg = (
  temporaryFolder: string,
  document: FlattenedDocument
): string[] =>
  document.content.pages
    .map((page, index) => {
      if (!fs.existsSync(page)) {
        console.log(
          `Page missing for notebook ${document.visibleName} - ${page}`
        );
        return;
      }

      try {
        const outputPage = `${temporaryFolder}/page-${index}.svg`;

        execSync(`rM2svg -i "${page}" -o "${outputPage}"`);

        return outputPage;
      } catch (err) {
        console.error(err);
        throw new Error(
          "An error occurred converting " +
            page +
            " " +
            index +
            " " +
            document.outputPath
        );
      }
    })
    .filter((svgPath) => typeof svgPath !== "undefined");

export default convertToSvg;
