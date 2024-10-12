import { getFilmsCall, getFeaturedCall, setFeaturedCall } from "server/api"
import { FilmMiniPoster, FilmPoster } from "./types"
import { adaptFilmMiniPoster, adaptFilmPoster } from "./adapter"

export const getFilms = async ({
  limit = 10,
  offset,
}: {
  limit?: number;
  offset: number;
}): Promise<{
  items: FilmMiniPoster[];
  totalCount: number;
  offset: number;
  limit: number;
}> => {
  const data = await getFilmsCall({offset, limit})
  return {
    items: data.items.map(adaptFilmMiniPoster),
    totalCount: data.totalCount,
    offset: data.offset,
    limit: data.limit,
  }
}

export const getFeaturedFilm = async (): Promise<FilmPoster> => {
  const featruedData = await getFeaturedCall()
  return adaptFilmPoster(featruedData)
}

export const setFeaturedFilm = async (filmId: string): Promise<void> => {
  await setFeaturedCall(filmId)
}
