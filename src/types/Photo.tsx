export type Photo = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
};

export type InitialPhoto = {
  data: Photo[];
  totalPages: number;
  isLoading: boolean;
};
