export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export interface dbInterface {
  id: string;
  name: string;
}

export interface GalleryImageView {
  name: string;
  description: string;
  id: string;
  imageUrl: string;
}
