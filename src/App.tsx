import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Heading,
  Container,
  TextField,
  Text,
  Flex,
  Badge,
  Grid,
  Box,
  Card,
  Inset,
} from "@radix-ui/themes";
import { useRef, useState } from "react";
import Unsplash from "./services/unsplash";

interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

function App() {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const searchPhotos = async (data: string) => {
    try {
      const response = await Unsplash.searchPhotos(data);
      setImages(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    searchPhotos(searchInput.current?.value || "");
  };

  const handleSelection = (selection: string) => {
    if (searchInput.current) searchInput.current.value = selection;
    searchPhotos(searchInput.current?.value || "");
  };

  return (
    <>
      <Container my="9" size="1">
        <Heading align="center" mb="1">
          Image Search App
        </Heading>
        <Text align="center" mb="4" as="p" color="gray">
          Images retrieved from Unsplash API
        </Text>
        <form onSubmit={handleSearch}>
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              placeholder="Type something to search…"
              type="search"
              ref={searchInput}
            />
          </TextField.Root>
          <Flex gap="2" mt="2" justify="center">
            <Badge onClick={() => handleSelection("nature")} color="orange">
              Nature
            </Badge>
            <Badge onClick={() => handleSelection("birds")} color="blue">
              Birds
            </Badge>
            <Badge onClick={() => handleSelection("cats")} color="green">
              Cats
            </Badge>
            <Badge onClick={() => handleSelection("shoes")} color="purple">
              Shoes
            </Badge>
          </Flex>
        </form>
        <Grid columns={{ initial: "2" }} gap="3" width="auto" mt="4">
          {images.map((image: Image) => {
            return (
              <Box key={image.id}>
                <Card>
                  <Inset clip="padding-box">
                    <img
                      src={image.urls.small}
                      alt={image.alt_description}
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
          })}
        </Grid>
      </Container>
    </>
  );
}

export default App;
