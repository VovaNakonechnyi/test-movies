export interface OMDBState {
  omdbItem: OMDBItem
  omdbItems: OMDBItems[]
  omdbCreated: CreatedOMDBItem[]
}

export interface OMDBResponse {
  Search: OMDBItems[]
  totalResults: string
  Response: string
}

export interface OMDBItems {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface OMDBItem {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  ImdbRating: string
  ImdbVotes: string
  ImdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface Rating {
  Source: string
  Value: string
}

export interface CreatedOMDBItem {
  ImdbID: string
  Title: string
  Year: string
  Poster: string
  Director: string
}
