export interface FilmPoster {
  id: string;
  title: string;
  coverImage: string;
  titleImage: string;
  date: Date;
  releaseYear: string
  mpaRating: string;
  genre: string;
  durationInSeconds: number;
  previewVideoUrl: string;
  description: string;
}

export interface FilmMiniPoster {
  id: string;
  title: string;
  image: string;
}
