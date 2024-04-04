import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, Button } from "@radix-ui/themes";
import { useCallback, useEffect, useRef, useState } from "react";
import Unsplash from "./services/unsplash";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import PhotoList from "./components/PhotoList";

function App() {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [images, setImage] = useState({
    data: [],
    totalPages: 0,
    page: 1,
    isLoading: false,
  });

  const searchPhotos = useCallback((data: string, page: number) => {
    try {
      const timeout = setTimeout(async () => {
        const response = await Unsplash.searchPhotos(data, page);
        setImage((prevState) => ({
          ...prevState,
          data: response.data.results,
          totalPages: response.data.total_pages,
          isLoading: !prevState.isLoading,
        }));
      }, 1000);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.error("Error fetching data: ", error);

      setImage((prevState) => ({
        ...prevState,
        isLoading: !prevState.isLoading,
      }));
    }
  }, []);

  useEffect(() => {
    searchPhotos(searchInput.current?.value || "", images.page);
  }, [images.page, searchPhotos]);

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    searchPhotos(searchInput.current?.value || "", images.page);

    setImage((prevState) => ({
      ...prevState,
      page: 1,
      isLoading: !prevState.isLoading,
    }));
  };

  const handleSelection = (selection: string) => {
    if (searchInput.current) searchInput.current.value = selection;

    searchPhotos(searchInput.current?.value || "", images.page);

    setImage((prevState) => ({
      ...prevState,
      page: 1,
      isLoading: !prevState.isLoading,
    }));
  };

  const handlePrevious = () => {
    setImage((prevState) => ({
      ...prevState,
      page: prevState.page - 1,
      isLoading: !prevState.isLoading,
    }));
  };

  const handleNext = () => {
    setImage((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
      isLoading: !prevState.isLoading,
    }));
  };

  return (
    <>
      <Header />
      <SearchForm
        input={searchInput}
        onSearchFormRef={handleSelection}
        onSearchFormSubmit={handleSearch}
      />
      <PhotoList loading={images.isLoading} images={images.data} />
      {images.totalPages > 0 && (
        <Flex gap="2" justify="center" mt="6" mb="9">
          {images.page > 1 && (
            <Button
              variant="soft"
              onClick={handlePrevious}
              aria-label="Previous page"
            >
              <ArrowLeftIcon />
              Prev
            </Button>
          )}
          {images.page < images.totalPages && (
            <Button variant="soft" onClick={handleNext} aria-label="Next page">
              Next <ArrowRightIcon />
            </Button>
          )}
        </Flex>
      )}
    </>
  );
}

export default App;
