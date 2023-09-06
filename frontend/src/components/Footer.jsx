import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        bg="white"
        w="100%"
        boxShadow="dark-lg"
        p={"5px"}
        mt="1000px"
        position="fixed"
        bottom="0px"
        left="0px"
      >
        <Text textAlign={"center"} fontWeight="bold">
          Made By Sumit Laishram
        </Text>
      </Box>
    </>
  );
};

export default Footer;
