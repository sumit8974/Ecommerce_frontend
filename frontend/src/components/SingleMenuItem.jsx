import {
  Button,
  ButtonGroup,
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { CartState } from "../context/CartProvider";
import { ProductState } from "../context/ProductProvider";

const SingleMenuItem = () => {
  const [qty, setQty] = useState(null);
  const pathName = window.location.pathname.split("/")[2];
  const { productState } = ProductState();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const item = productState.product?.find((ele) => {
    return ele._id == pathName;
  });
  const cartItem = cart?.find((ele) => {
    return ele._id == pathName;
  });
  useEffect(() => {
    setQty(cartItem ? cartItem.qty : 1);
  }, []);
  return (
    <>
      <Box display="flex" minH="100vh" justifyContent="center">
        {item === undefined ? (
          <Heading mt={"100px"} width="100%" textAlign="center">
            🌀 Loading...
          </Heading>
        ) : (
          <Flex
            alignItems="center"
            p="20px"
            mt="75px"
            maxW={{ base: "95%", sm: "90%", md: "80%" }}
            display={{ base: "block", lg: "flex" }}
          >
            <Image
              objectFit={{ base: "fit", lg: "cover" }}
              h="400px"
              maxWidth={{ base: "100%", lg: "500px" }}
              _hover={{ cursor: "pointer" }}
              src={`${item.src}`}
              loading="lazy"
              mr={{ base: "0px", lg: "9px" }}
              mb={{ base: "7px", lg: "0px" }}
            ></Image>
            <Stack spacing="3">
              <Heading size="md">{item.name}</Heading>
              <Text>{item.desc}</Text>
              <Text color="blue.600" fontSize="2xl">
                Rs : {item.price}
              </Text>
              <Flex gap={3} alignItems="center">
                <Button
                  bg="white"
                  _hover={{ bg: "teal.100" }}
                  onClick={() => {
                    dispatch({
                      type: "DECREMENT_CART_QTY",
                      payload: {
                        _id: item._id,
                        qty: Number(qty) - 1,
                      },
                    });
                    setQty(Number(qty) - 1);
                  }}
                  isDisabled={qty <= 1 ? true : false}
                  w="20px"
                >
                  <MinusIcon />
                </Button>
                <Text fontWeight={600} fontSize="20px" textAlign="center">
                  {qty}
                </Text>
                <Button
                  bg="white"
                  _hover={{ bg: "teal.100" }}
                  p={0}
                  onClick={() => {
                    dispatch({
                      type: "INCREMENT_CART_QTY",
                      payload: {
                        _id: item._id,
                        qty: Number(qty) + 1,
                      },
                    });
                    setQty(Number(qty) + 1);
                  }}
                  isDisabled={qty >= 5 ? true : false}
                  w="20px"
                >
                  <AddIcon />
                </Button>
              </Flex>
              <ButtonGroup spacing="2">
                {cart.some((p) => p._id === item._id) ? (
                  <Button
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      });
                    }}
                    variant="solid"
                    colorScheme="red"
                  >
                    Remove from cart
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: { item: item, qty: qty },
                      });
                    }}
                    variant="solid"
                    colorScheme="teal"
                  >
                    Add to cart
                  </Button>
                )}
              </ButtonGroup>
            </Stack>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default SingleMenuItem;

/**
            /* <Card
            minW={"base"}
            mt={"100px"}
            maxW={{ base: "95%", sm: "90%", md: "80%" }}
          >
            <CardBody display={{ md: "block", lg: "flex" }}>
              <Image
                objectFit={{ lg: "cover" }}
                h="400px"
                maxWidth={{ base: "350px", sm: "400px", md: "500px" }}
                ml={"auto"}
                mr={{ base: "auto", sm: "auto", lg: "10px" }}
                transition={"transform .2s ease-in-out"}
                _hover={{ cursor: "pointer" }}
                src={`${item.src}`}
                loading="lazy"
              ></Image>
              <Stack mt="6" spacing="3">
                <Heading size="md">{item.name}</Heading>
                <Text>{item.desc}</Text>
                <Text color="blue.600" fontSize="2xl">
                  Rs : {item.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                {cart.some((p) => p._id === item._id) ? (
                  <Button
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      });
                    }}
                    variant="solid"
                    colorScheme="red"
                  >
                    Remove from cart
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: item,
                      });
                    }}
                    variant="solid"
                    colorScheme="teal"
                  >
                    Add to cart
                  </Button>
                )}
              </ButtonGroup>
            </CardFooter>
          </Card> */
