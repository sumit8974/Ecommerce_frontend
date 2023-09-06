import { Button, Flex, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ProductState } from "../context/ProductProvider";

const Filter = () => {
  const {
    productState: { byProductType },
    productDispatch,
  } = ProductState();
  return (
    <>
      <Flex mt={"100px"} justifyContent="center" alignItems={"center"}>
        <Text fontWeight={"bold"} mr="10px">
          Filters:
        </Text>
        <RadioGroup>
          <Stack spacing={2} direction="row">
            <input
              type="radio"
              name="group1"
              style={{ cursor: "pointer" }}
              checked={byProductType === "Laptop" ? true : false}
              onChange={() =>
                productDispatch({
                  type: "BY_PRODUCT_TYPE",
                  payload: "Laptop",
                })
              }
            />
            <label style={{ fontWeight: "bold" }}>Laptop</label>
            <input
              type="radio"
              name="group1"
              style={{ cursor: "pointer" }}
              checked={byProductType === "TV" ? true : false}
              onChange={() =>
                productDispatch({
                  type: "BY_PRODUCT_TYPE",
                  payload: "TV",
                })
              }
            />
            <label style={{ fontWeight: "bold" }}>TV</label>
            <input
              type="radio"
              name="group1"
              style={{ cursor: "pointer" }}
              checked={byProductType === "Phone" ? true : false}
              onChange={() =>
                productDispatch({
                  type: "BY_PRODUCT_TYPE",
                  payload: "Phone",
                })
              }
            />
            <label style={{ fontWeight: "bold" }}>Phone</label>
          </Stack>
        </RadioGroup>
        <Button
          visibility={byProductType ? "visible" : "hidden"}
          opacity={byProductType ? 1 : 0}
          transition="opacity 0.7s ease-in-out"
          ml="5px"
          bg="red.200"
          h="35px"
          _hover={{ bg: "red.100" }}
          onClick={() =>
            productDispatch({
              type: "CLEAR_FILTERS",
            })
          }
        >
          Clear
        </Button>
      </Flex>
    </>
  );
};

export default Filter;
