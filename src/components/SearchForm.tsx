import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Badge, Container, Flex, TextField } from "@radix-ui/themes";
import { FC } from "react";

interface SearchFormProps {
  input: React.RefObject<HTMLInputElement | null>;
  onSearchFormRef: (selection: string) => void;
  onInputChange: (input: string) => void;
}

const SearchForm: FC<SearchFormProps> = ({
  input,
  onSearchFormRef,
  onInputChange,
}) => {
  return (
    <Container size="1">
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder="Type something to search…"
          type="search"
          ref={input as React.RefObject<HTMLInputElement>}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </TextField.Root>
      <Flex gap="2" mt="2" justify="center">
        <Badge
          role="badge"
          onClick={() => onSearchFormRef("nature")}
          color="orange"
        >
          Nature
        </Badge>
        <Badge
          role="badge"
          onClick={() => onSearchFormRef("birds")}
          color="blue"
        >
          Birds
        </Badge>
        <Badge
          role="badge"
          onClick={() => onSearchFormRef("cats")}
          color="green"
        >
          Cats
        </Badge>
        <Badge
          role="badge"
          onClick={() => onSearchFormRef("shoes")}
          color="purple"
        >
          Shoes
        </Badge>
      </Flex>
    </Container>
  );
};

export default SearchForm;
