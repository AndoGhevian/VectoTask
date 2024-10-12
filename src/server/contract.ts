/* 
The server part is designed to highlight the understanding of
the difference between layers in the application.
 */
export interface FilmPosterCON {
  Id: string
  Title: string
  CoverImage: string
  TitleImage: string
  Date: string
  ReleaseYear: string
  MpaRating: string
  Category: string
  Duration: string
  VideoUrl: string
  Description: string | null
}
