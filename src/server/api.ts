import data from "./data.json"
import { FilmPosterCON } from "./contract"

const MAX_LIMIT = 50

export const getFilmsCall = async ({
  limit = 50,
  offset,
}: {
  limit?: number
  offset: number
}): Promise<FilmPosterCON[]> => {
  const normLimit = Math.min(limit, MAX_LIMIT)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        data.TendingNow.slice(offset, offset + normLimit)
        .map((film) => ({
          Id: film.Id,
          Title: film.Title,
          CoverImage: film.CoverImage,
          TitleImage: film.TitleImage,
          Date: film.Date,
          ReleaseYear: film.ReleaseYear,
          MpaRating: film.MpaRating,
          Category: film.Category,
          Duration: film.Duration,
          VideoUrl: film.VideoUrl,
          Description: film.Description,
          }) satisfies FilmPosterCON)
      )
    }, 1000)
  })
}

export const getFeaturedCall = async (): Promise<FilmPosterCON> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const featruedData = (data.TendingNow.find((film) => film.Id === data.FeaturedId) || data.TendingNow[0])
      resolve({
        Id: featruedData.Id,
        Title: featruedData.Title,
        CoverImage: featruedData.CoverImage,
        TitleImage: featruedData.TitleImage,
        Date: featruedData.Date,
        ReleaseYear: featruedData.ReleaseYear,
        MpaRating: featruedData.MpaRating,
        Category: featruedData.Category,
        Duration: featruedData.Duration,
        VideoUrl: featruedData.VideoUrl,
        Description: featruedData.Description,
      } satisfies FilmPosterCON)
    }, 1000)
  })
}

export const setFeaturedCall = async (filmId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(data.TendingNow.some((film) => film.Id === filmId)) {
        data.FeaturedId = filmId
        resolve()
      } else {
        reject(new Error("Film not found"))
      }
    }, 1000)
  })
}
