import { Heading, Text } from "@radix-ui/themes";
import { FC } from "react";

const Header: FC = () => {
  return (
    <>
      <Heading align="center" mb="1" mt="9">
        Image Search App
      </Heading>
      <Text align="center" mb="4" as="p" color="gray">
        Images retrieved from Unsplash API
      </Text>
    </>
  );
};

export default Header;
