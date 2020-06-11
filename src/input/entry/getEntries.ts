import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import RemarkableMetadata from "../../types/RemarkableMetadata";

const findMetadataFiles = async (baseDir): Promise<string[]> => {
  const metadataFiles = glob.sync("**/*.metadata", {
    cwd: baseDir,
    absolute: true,
  });

  if (metadataFiles.length === 0) {
    return [];
  }
  console.log("Found files", metadataFiles);

  return metadataFiles;
};

const readMetadata = (metadataFile: string): RemarkableMetadata => {
  const rawMetadata = fs.readFileSync(metadataFile, { encoding: "utf-8" });

  const metadata = JSON.parse(rawMetadata);

  const id = path.basename(metadataFile).replace(/\.metadata/, "");

  return {
    id,
    lastModified: metadata.lastModified,
    parent: metadata.parent,
    type: metadata.type,
    visibleName: metadata.visibleName,
  };
};

const getEntries = async (baseDir: string): Promise<RemarkableMetadata[]> => {
  const metadataFiles = await findMetadataFiles(baseDir);

  return metadataFiles.map(readMetadata);
};

export default getEntries;
