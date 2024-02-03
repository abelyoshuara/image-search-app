import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    "Content-type": "application/json",
  },
});
