export interface IAnimeListItem {
    id: string,
    title: string,
    rating: string,
    imageUrl: string
}

export interface IPagination {
    currentPage: number,
    hasNextPage: boolean,
    total: number
  }