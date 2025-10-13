import axios from "axios";


export const getMovies = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/home`, {
    withCredentials: true,
  });
  // MovieResponse → CarouselRow에서 요구하는 형태로 변환
  return res.data.map((m, idx) => ({
    id: m.docId,         // 백엔드에서 내려오는 docId
    title: m.title,
    poster: m.posterUrl,
    rank: idx + 1,
    averageRating: m.averageRating ?? 0.0, //  평점 추가
  }));
};