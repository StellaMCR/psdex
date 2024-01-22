import axios from "axios";

export async function getAnimesList() {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/anime');
    return response
  } catch (error) {
    return error
  }
}