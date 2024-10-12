import { FilmPosterCON } from "server/contract";
import { FilmMiniPoster, FilmPoster } from "./types";

export const adaptFilmMiniPoster = (filmData: FilmPosterCON): FilmMiniPoster => ({
  id: filmData.Id,
  title: filmData.Title,
  image: filmData.CoverImage,
})

export const adaptFilmPoster = (filmData: FilmPosterCON): FilmPoster => ({
  id: filmData.Id,
  title: filmData.Title,
  coverImage: filmData.CoverImage,
  titleImage: filmData.TitleImage,
  date: new Date(filmData.Date),
  releaseYear: filmData.ReleaseYear,
  mpaRating: filmData.MpaRating,
  genre: filmData.Category,
  durationInSeconds: Number(filmData.Duration),
  previewVideoUrl: filmData.VideoUrl,
  description: filmData.Description || "",
})
