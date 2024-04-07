export type Photo = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
};

export type InitialPhotos = {
  data: Photo[];
  totalPages: number;
  isLoading: boolean;
  error: string;
};
