import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";

interface Metadata {
  id: string;
  lastModified: string;
  parent: Metadata["id"];
  type: "DocumentType" | "CollectionType";
  visibleName: string;
}

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

const readMetadata = (metadataFile: string): Metadata => {
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

const getNotebooks = async (baseDir): Promise<Metadata[]> => {
  const metadataFiles = await findMetadataFiles(baseDir);

  return metadataFiles.map(readMetadata);
};

export default getNotebooks;
