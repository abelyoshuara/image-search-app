import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, Button } from "@radix-ui/themes";
import { useSearchParams } from "react-router-dom";
import Unsplash from "./services/unsplash";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import PhotoList from "./components/PhotoList";
import { useDebouncedCallback } from "./hooks/useDebounceCallback";

function App() {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [images, setImage] = useState({
    data: [],
    totalPages: 0,
    page: 1,
    isLoading: false,
  });

  const searchPhotos = useCallback((data: string, page: number) => {
    if (!data) return false;
    try {
      const timeout = setTimeout(async () => {
        const response = await Unsplash.searchPhotos(data, page);
        setImage((prevState) => ({
          ...prevState,
          data: response.data.results,
          totalPages: response.data.total_pages,
          isLoading: false,
        }));
      }, 1000);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.error("Error fetching data: ", error);

      setImage((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    const queryParam = searchParams.get("q");

    if (queryParam) {
      searchInput.current!.value = queryParam;

      setImage((prevState) => ({
        ...prevState,
        page: prevState.page,
        isLoading: true,
      }));

      setSearchParams((prevState) => ({
        ...prevState,
        page: String(images.page),
        q: searchInput.current!.value,
      }));
    }

    searchPhotos(searchInput.current!.value || "", images.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.page, searchInput.current?.value, searchPhotos]);

  const handleSearch = useDebouncedCallback((input: string) => {
    if (input) {
      searchInput.current!.value = input;

      setImage((prevState) => ({
        ...prevState,
        page: 1,
      }));

      setSearchParams({ page: String(images.page), q: input });
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("q");

      setSearchParams(newSearchParams);
      searchInput.current!.value = input;
    }
  }, 500);

  const handleSelection = (selection: string) => {
    searchInput.current!.value = selection;

    setSearchParams({ page: String(images.page), q: selection });

    setImage((prevState) => ({
      ...prevState,
      page: 1,
    }));
  };

  const handlePrevious = () => {
    setImage((prevState) => ({
      ...prevState,
      page: images.page - 1,
      isLoading: true,
    }));
  };

  const handleNext = () => {
    setImage((prevState) => ({
      ...prevState,
      page: images.page + 1,
      isLoading: true,
    }));
  };

  return (
    <>
      <Header />
      <SearchForm
        input={searchInput}
        onSearchFormRef={handleSelection}
        onInputChange={handleSearch}
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
