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
import { useRef } from "react";

function App() {
  const searchInput = useRef<HTMLInputElement | null>(null);

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(searchInput.current?.value);
  };

  const handleSelection = (selection: string) => {
    if (searchInput.current) searchInput.current.value = selection;
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
          <Box>
            <Card>
              <Inset clip="padding-box">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
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
          <Box>
            <Card>
              <Inset clip="padding-box">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
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
          <Box>
            <Card>
              <Inset clip="padding-box">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
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
          <Box>
            <Card>
              <Inset clip="padding-box">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
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
          <Box>
            <Card>
              <Inset clip="padding-box">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
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
          <Box>
            <Card>
              <Inset clip="padding-box">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
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
        </Grid>
      </Container>
    </>
  );
}

export default App;
