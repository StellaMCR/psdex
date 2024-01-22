import axios from "axios";

export async function getAnimesById(id: number) {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    return response
  } catch (error) {
    return error
  }
}