export interface BookCategory {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  averageRating: number;
  thumbnail: string;
  publisher: string;
  publishedDate: string;
  categories: BookCategory[];
  isbn10: string;
  infoLink: string;
}
