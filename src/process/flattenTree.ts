import EntryConversionContext from "../types/EntryConversionContext";
import EntryTree, { EntryLeaf } from "../types/EntryTree";
import { isDocumentMetadata } from "../types/DocumentMetadata";
import FlattenedDocument from "../types/FlattenedDocument";
import { isCollectionMetadata } from "../types/CollectionMetadata";
import * as path from "path";
const flattenTree = (
  context: EntryConversionContext,
  tree: EntryTree
): FlattenedDocument[] => {
  return flattenTreeInternal(context, tree, [], []);
};

const flattenTreeInternal = (
  context: EntryConversionContext,
  tree: EntryTree,
  parentNames: string[],
  accumulator: FlattenedDocument[]
): FlattenedDocument[] => {
  return Object.values(tree).reduce(
    (acc: FlattenedDocument[], leaf: EntryLeaf) => {
      if (isDocumentMetadata(leaf)) {
        acc.push({
          ...leaf,
          outputPath: path.join(...parentNames, leaf.visibleName),
        });
      } else if (isCollectionMetadata(leaf)) {
        flattenTreeInternal(
          context,
          leaf.children,
          [...parentNames, leaf.visibleName],
          acc
        );
      }
      return acc;
    },
    accumulator
  );
};

export default flattenTree;
