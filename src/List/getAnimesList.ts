import axios from "axios";
import { IAnimeListItem, IPagination } from "./types";

export async function getAnimesList(name: string, page?: number): Promise<{
  data: IAnimeListItem[];
  pagination: IPagination;
}>{
  try {
    const response = await axios.get('https://api.jikan.moe/v4/anime',
    {
      params: {
        sfw: true, //Garantindo que resultados sejam adequados para ambiente de trabalho
        unaproved: false, //Restringindo resultados aos aprovados pelo MyAnimeList
        limit: 10, //Limitando tamanho da página
        page: page,
        q: name,
      }
    });

    const data = response.data.data.map((item: any) => {
        return {
          id: item.mal_id,
          title: item.title,
          rating: item.rating,
          imageUrl: item.images.jpg.small_image_url
      }
    })

    const pagination = {
      currentPage: response.data.pagination.current_page,
      hasNextPage: response.data.pagination.has_next_page,
      total: response.data.pagination.items.total,
    }
    

    return {data: data, pagination: pagination}
  } catch (error) {
    throw error
  }
}