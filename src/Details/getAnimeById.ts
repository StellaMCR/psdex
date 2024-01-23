import axios from "axios";
import { IAnimeDetails } from "./types";

export async function getAnimesById(id: string): Promise<IAnimeDetails> {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    return {
      title: response.data.data.title,
      japaneseTitle: response.data.data.title_japanese,
      synopsis: response.data.data.synopsis,
      rating: response.data.data.rating,
      imageUrl: response.data.data.images.jpg.image_url,
      trailerUrl: response.data.data.trailer.url
  }
  } catch (error) {
    throw error
  }
}