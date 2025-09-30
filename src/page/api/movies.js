import axios from "axios";


export const getMovies = async () => {
  const res = await axios.get("http://localhost:8080/api/home", {
    withCredentials: true,
  });
  // MovieResponse → CarouselRow에서 요구하는 형태로 변환
  return res.data.map((m, idx) => ({
    id: m.docId,       // 혹은 m.id
    title: m.title,
    poster: m.posterUrl,
    rank: idx + 1,     // 캐러셀에 rank UI가 있으니 인덱스로 부여
  }));
};