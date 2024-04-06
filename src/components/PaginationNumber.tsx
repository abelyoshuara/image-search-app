import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

interface PaginationNumberProps {
  allPages: (string | number)[];
  currentPage: number;
  createPageURL: (page: string | number) => string;
}

export default function PaginationNumber({
  allPages,
  currentPage,
  createPageURL,
}: PaginationNumberProps) {
  return (
    <>
      {allPages.map((page, index) => {
        if (page === currentPage || page === "...") {
          return (
            <Button
              key={index}
              variant={page === "..." ? "soft" : "solid"}
              aria-label="Current page"
            >
              {page}
            </Button>
          );
        }
        return (
          <Link to={createPageURL(page)} key={index}>
            <Button variant="soft" aria-label="Next page">
              {page}
            </Button>
          </Link>
        );
      })}
    </>
  );
}
