import FlattenedDocument from "../types/FlattenedDocument";
import { execSync } from "child_process";
import * as fs from "fs";

const convertToSvg = (
  temporaryFolder: string,
  document: FlattenedDocument
): string[] =>
  document.pages
    .map((page, index) => {
      if (!fs.existsSync(page.source)) {
        console.log(
          `Page missing for notebook ${document.name} - ${page.source}`
        );
        return;
      }

      try {
        const outputPage = `${temporaryFolder}/page-${index}.svg`;

        execSync(`rM2svg -i "${page.source}" -o "${outputPage}"`);

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
