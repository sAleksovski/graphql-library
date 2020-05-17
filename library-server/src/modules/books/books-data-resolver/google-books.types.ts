export interface ResolvedBookData {
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  description: string;
  isbn13?: string;
  isbn10?: string;
  pageCount: number;
  printType: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  smallThumbnail: string;
  thumbnail: string;
  language: string;
  infoLink: string;
}
