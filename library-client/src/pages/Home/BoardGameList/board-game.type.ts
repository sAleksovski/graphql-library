export interface BoardGame {
  id: number;
  title: string;
  description: string;
  smallThumbnail: string;
  thumbnail: string;
  publisher: string;
  publishedDate: string;
  averageRating: number;
  ratingsCount: number;
  minPlayers: number;
  maxPlayers: number;
  minPlayTime: number;
  maxPlayTime: number;
  boardGameAtlasUrl: string;
  officialUrl: string;
  rulesUrl: string;
}
