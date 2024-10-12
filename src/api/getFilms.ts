import { getFilmsCall, getFeaturedCall, setFeaturedCall } from "server/api"
import { FilmMiniPoster, FilmPoster } from "./types"
import { adaptFilmMiniPoster, adaptFilmPoster } from "./adapter"

export const getFilms = async ({
  limit = 10,
  offset,
}: {
  limit?: number
  offset: number
}): Promise<FilmMiniPoster[]> => {
  const filmsData = await getFilmsCall({offset, limit})
  return filmsData.map((film) => adaptFilmMiniPoster(film))
}

export const getFeaturedFilm = async (): Promise<FilmPoster> => {
  const featruedData = await getFeaturedCall()
  return adaptFilmPoster(featruedData)
}

export const setFeaturedFilm = async (filmId: string): Promise<void> => {
  await setFeaturedCall(filmId)
}
