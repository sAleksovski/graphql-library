declare interface GoogleBookIndustryIdentifier {
  type: 'ISBN_10' | 'ISBN_13';
  identifier: string;
}

declare interface GoogleBookImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

declare interface GoogleBookInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: GoogleBookIndustryIdentifier[];
  pageCount: number;
  printType: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  imageLinks: GoogleBookImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

declare module 'node-isbn' {
  type ProviderName = 'google' | 'openlibrary' | 'worldcat';

  interface ProviderNames {
    GOOGLE: 'google';
    OPENLIBRARY: 'openlibrary';
    WORLDCAT: 'worldcat';
  }

  interface NodeIsbn {
    resolve: (isbn: string) => Promise<GoogleBookInfo>;
    provider: (providers: ProviderName[]) => NodeIsbn;
    PROVIDER_NAMES: ProviderNames;
  }

  const nodeIsbn: NodeIsbn;

  export = nodeIsbn;
}
