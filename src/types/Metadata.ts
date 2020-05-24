interface Metadata {
  id: string;
  lastModified: string;
  parent: Metadata["id"];
  type: "DocumentType" | "CollectionType";
  visibleName: string;
}

export default Metadata;
