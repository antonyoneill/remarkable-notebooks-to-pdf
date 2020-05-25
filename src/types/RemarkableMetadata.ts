interface RemarkableMetadata {
  id: string;
  lastModified: string;
  parent: RemarkableMetadata["id"];
  type: "DocumentType" | "CollectionType";
  visibleName: string;
}

export default RemarkableMetadata;
