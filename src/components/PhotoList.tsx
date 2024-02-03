import { FC } from "react";
import { Container, Grid } from "@radix-ui/themes";
import SkeletonLoading from "./SkeletonLoading";
import PhotoItem from "./PhotoItem";
import Image from "../interfaces/image";

interface PhotoListProps {
  loading: boolean;
  images: Image[];
}

const PhotoList: FC<PhotoListProps> = ({ loading, images }) => {
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
            {images.map((image: Image) => {
              return (
                <PhotoItem
                  key={image.id}
                  src={image.urls.small}
                  alt={image.alt_description}
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
