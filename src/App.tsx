import { useCallback, useEffect, useRef, useState } from "react";
import { Flex } from "@radix-ui/themes";
import { useLocation, useSearchParams } from "react-router-dom";
import Unsplash from "./services/unsplash";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import PhotoList from "./components/PhotoList";
import { useDebouncedCallback } from "./hooks/useDebounceCallback";
import { generatePagination } from "./utils/pagination";
import PaginationNumber from "./components/PaginationNumber";
import PaginationArrow from "./components/PaginationArrow";

function App() {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [images, setImage] = useState({
    data: [],
    totalPages: 0,
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
      }, 500);

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
    const queryParamQ = searchParams.get("q");
    const queryParamPage = Number(searchParams.get("page") || "1");

    if (queryParamQ) {
      setImage((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      setSearchParams((prevState) => ({
        ...prevState,
        page: queryParamPage.toString(),
        q: queryParamQ,
      }));

      searchInput.current!.value = queryParamQ;

      searchPhotos(queryParamQ, Number(queryParamPage || "1"));
    } else {
      setImage((prevState) => ({
        ...prevState,
        data: [],
        totalPages: 0,
        isLoading: false,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, searchPhotos]);

  const handleSearch = useDebouncedCallback((input: string) => {
    if (input) {
      searchInput.current!.value = input;
      setSearchParams({ page: "1", q: input });
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("q");

      setSearchParams(newSearchParams);
      searchInput.current!.value = input;
    }
  }, 500);

  const handleSelection = (selection: string) => {
    searchInput.current!.value = selection;
    setSearchParams({ page: "1", q: selection });
  };

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(images.totalPages / 20);
  const allPages = generatePagination(currentPage, totalPages);

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
          {currentPage > 1 && (
            <PaginationArrow
              direction="left"
              href={createPageURL(currentPage - 1)}
            />
          )}

          <PaginationNumber
            allPages={allPages}
            currentPage={currentPage}
            createPageURL={createPageURL}
          />

          {currentPage < totalPages && (
            <PaginationArrow
              direction="right"
              href={createPageURL(currentPage + 1)}
            />
          )}
        </Flex>
      )}
    </>
  );
}

export default App;
