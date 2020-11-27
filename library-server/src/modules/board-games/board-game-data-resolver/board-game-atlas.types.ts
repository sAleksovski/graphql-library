export interface ResolvedBoardGameData {
  id: string;
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
  alreadyAdded?: boolean;
}

export interface BoardGameAtlasGame {
  id: string;
  name: string;
  year_published: number;
  min_players: number;
  max_players: number;
  min_playtime: number;
  max_playtime: number;
  description: string;
  image_url: string;
  thumb_url: string;
  url: string;
  primary_publisher: { name: string };
  num_user_ratings: number;
  average_user_rating: number;
  official_url: string;
  rules_url: string;
}

export interface BoardGameAtlasData {
  games: BoardGameAtlasGame[];
}
