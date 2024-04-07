import type { InitialPhotos, Photo } from "../types/Photo";

export type Action =
  | {
      type: "SUCCESS_SEARCH_PHOTO";
      payload: { data: Photo[]; totalPages: number };
    }
  | {
      type: "FAIL_SEARCH_PHOTO";
      payload: { error: string };
    }
  | { type: "SET_IS_LOADING"; payload: { isLoading: boolean } }
  | { type: "CLEAR" };

const initialPhotos: InitialPhotos = {
  data: [],
  totalPages: 0,
  isLoading: false,
  error: "",
};

function photosReducer(photos: InitialPhotos, action: Action) {
  switch (action.type) {
    case "SUCCESS_SEARCH_PHOTO": {
      const { data, totalPages } = action.payload;
      return {
        ...photos,
        data,
        totalPages,
        isLoading: false,
      };
    }

    case "FAIL_SEARCH_PHOTO": {
      const { error } = action.payload;
      return {
        ...photos,
        data: [],
        totalPages: 0,
        isLoading: false,
        error,
      };
    }

    case "SET_IS_LOADING": {
      const { isLoading } = action.payload;
      return {
        ...photos,
        isLoading,
      };
    }

    case "CLEAR": {
      return {
        data: [],
        totalPages: 0,
        isLoading: false,
        error: "",
      };
    }

    default:
      throw new Error("Unknown action.");
  }
}

export { photosReducer, initialPhotos };
