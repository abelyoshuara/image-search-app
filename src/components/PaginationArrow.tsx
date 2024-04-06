import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

interface PaginationArrow {
  direction: string;
  href: string;
}

export default function PaginationArrow({ direction, href }: PaginationArrow) {
  let content;
  if (direction === "left") {
    content = <>{<ArrowLeftIcon />} Prev</>;
  } else {
    content = <>Next {<ArrowRightIcon />}</>;
  }

  return (
    <Link to={href}>
      <Button
        variant="soft"
        aria-label={`${direction === "left" ? "Prev" : "Next"} page`}
      >
        {content}
      </Button>
    </Link>
  );
}
