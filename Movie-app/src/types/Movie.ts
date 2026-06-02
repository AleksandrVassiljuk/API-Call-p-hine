export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  vote_count?: number;

  overview?: string;
  release_date?: string;
  original_language?: string;

  popularity?: number;
  adult?: boolean;
};