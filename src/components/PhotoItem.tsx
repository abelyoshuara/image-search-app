import { FC } from "react";
import { Box, Card, Inset } from "@radix-ui/themes";

interface PhotoItemProps {
  src: string;
  alt: string;
}

const PhotoItem: FC<PhotoItemProps> = ({ src, alt }) => {
  return (
    <Box>
      <Card>
        <Inset clip="padding-box">
          <img
            data-testid="img"
            src={src}
            alt={alt}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
      </Card>
    </Box>
  );
};

export default PhotoItem;
