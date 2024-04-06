import { FC } from "react";
import { Container, Grid } from "@radix-ui/themes";
import SkeletonLoading from "./SkeletonLoading";
import PhotoItem from "./PhotoItem";
import type { Photo } from "../types/Photo";

interface PhotoListProps {
  loading: boolean;
  photos: Photo[];
}

const PhotoList: FC<PhotoListProps> = ({ loading, photos }) => {
  return (
    <Container size={{ initial: "1", sm: "2", md: "3" }}>
      {loading ? (
        <Grid
          columns={{ initial: "2", sm: "3", md: "4" }}
          gap="3"
          width="auto"
          mt="4"
        >
          {[...Array(20)].map((_, index) => {
            return <SkeletonLoading key={index} />;
          })}
        </Grid>
      ) : (
        <>
          <Grid
            columns={{ initial: "2", sm: "3", md: "4" }}
            gap="3"
            width="auto"
            mt="4"
          >
            {photos.map((photo) => {
              return (
                <PhotoItem
                  key={photo.id}
                  src={photo.urls.small}
                  alt={photo.alt_description}
                />
              );
            })}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default PhotoList;
