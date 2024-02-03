import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Badge, Container, Flex, TextField } from "@radix-ui/themes";
import { FC } from "react";

interface SearchFormProps {
  input: React.RefObject<HTMLInputElement | null>;
  onSearchFormRef: (selection: string) => void;
  onSearchFormSubmit: (event: React.FormEvent) => void;
}

const SearchForm: FC<SearchFormProps> = ({
  input,
  onSearchFormRef,
  onSearchFormSubmit,
}) => {
  return (
    <Container size="1">
      <form onSubmit={onSearchFormSubmit}>
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            placeholder="Type something to search…"
            type="search"
            ref={input as React.RefObject<HTMLInputElement>}
          />
        </TextField.Root>
        <Flex gap="2" mt="2" justify="center">
          <Badge onClick={() => onSearchFormRef("nature")} color="orange">
            Nature
          </Badge>
          <Badge onClick={() => onSearchFormRef("birds")} color="blue">
            Birds
          </Badge>
          <Badge onClick={() => onSearchFormRef("cats")} color="green">
            Cats
          </Badge>
          <Badge onClick={() => onSearchFormRef("shoes")} color="purple">
            Shoes
          </Badge>
        </Flex>
      </form>
    </Container>
  );
};

export default SearchForm;
