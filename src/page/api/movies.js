import { apiFetch } from "./client";



export async function getMovies() {
  return apiFetch("/movies"); // 리스트로 보내면될듯
}