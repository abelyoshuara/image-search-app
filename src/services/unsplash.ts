import http from "../utils/http-common";
const clientId = import.meta.env.VITE_ACCESS_KEY;
const perPage = 20;

const searchPhotos = (query: string, page: number) => {
  return http.get(
    `/search/photos?page=${page}&per_page=${perPage}&query=${query}&client_id=${clientId}`,
  );
};

const Unsplash = {
  searchPhotos,
};

export default Unsplash;
