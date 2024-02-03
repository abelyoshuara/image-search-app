import http from "../utils/http-common";
const clientId = import.meta.env.VITE_ACCESS_KEY;

const searchPhotos = (query: string) => {
  return http.get(
    `/search/photos?page=1&per_page=20&query=${query}&client_id=${clientId}`,
  );
};

const Unsplash = {
  searchPhotos,
};

export default Unsplash;
