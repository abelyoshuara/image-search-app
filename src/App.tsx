import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, Button } from "@radix-ui/themes";
import { useCallback, useEffect, useRef, useState } from "react";
import Unsplash from "./services/unsplash";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import PhotoList from "./components/PhotoList";
import Image from "./interfaces/image";

function App() {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const searchPhotos = useCallback((data: string, page: number) => {
    try {
      const timeout = setTimeout(async () => {
        const response = await Unsplash.searchPhotos(data, page);
        setImages(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchPhotos(searchInput.current?.value || "", page);
  }, [page, searchPhotos]);

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    searchPhotos(searchInput.current?.value || "", page);
    setPage(1);
  };

  const handleSelection = (selection: string) => {
    if (searchInput.current) searchInput.current.value = selection;
    setLoading(true);
    searchPhotos(searchInput.current?.value || "", page);
    setPage(1);
  };

  return (
    <>
      <Header />
      <SearchForm
        input={searchInput}
        onSearchFormRef={handleSelection}
        onSearchFormSubmit={handleSearch}
      />
      <PhotoList loading={loading} images={images} />
      {totalPages > 0 && (
        <Flex gap="2" justify="center" mt="6" mb="9">
          {page > 1 && (
            <Button
              variant="soft"
              onClick={() => {
                setPage(page - 1);
                setLoading(true);
              }}
              aria-label="Previous page"
            >
              <ArrowLeftIcon />
              Prev
            </Button>
          )}
          {page < totalPages && (
            <Button
              variant="soft"
              onClick={() => {
                setPage(page + 1);
                setLoading(true);
              }}
              aria-label="Next page"
            >
              Next <ArrowRightIcon />
            </Button>
          )}
        </Flex>
      )}
    </>
  );
}

export default App;
