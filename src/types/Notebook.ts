interface Page {
  source: string;
}

interface Notebook {
  id: string;
  lastModified: string;
  name: string;
  parent: string;
  pages: Page[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const isNotebook = (obj: any): obj is Notebook => obj.name && obj.pages;

export default Notebook;
