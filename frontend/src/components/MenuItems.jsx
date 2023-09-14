import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { CartState } from "../context/CartProvider";
import { ProductState } from "../context/ProductProvider";
import Filter from "./Filter";

const MenuItems = () => {
  const history = useNavigate();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const { productState, isLoading } = ProductState();
  const transformProducts = () => {
    let sortedProducts = productState.product;
    let searchQuery = productState.searchQuery;
    let filterByProduct = productState.byProductType;
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterByProduct === "Laptop") {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.category === "Laptop"
      );
    }
    if (filterByProduct === "TV") {
      sortedProducts = sortedProducts.filter((prod) => prod.category === "TV");
    }
    if (filterByProduct === "Phone") {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.category === "Phone"
      );
    }
    return sortedProducts;
  };
  const menuData = transformProducts();
  return (
    <>
      {menuData?.length > 0 && !isLoading ? <Filter /> : null}
      <Flex
        w={"90%"}
        ml="auto"
        mr={"auto"}
        p="20px"
        gap={"10"}
        flexWrap="wrap"
        alignItems={"center"}
        justifyContent="center"
        position="relative"
        mt={"30px"}
      >
        {isLoading ? (
          <Skeleton
            height={"90vh"}
            w={"90vw"}
            isLoaded={!isLoading}
            fadeDuration={2}
            mt="70px"
          ></Skeleton>
        ) : menuData.length <= 0 ? (
          <Text
            fontSize="20px"
            fontWeight="medium"
            textAlign="center"
            mt="70px"
          >
            No Products available...
          </Text>
        ) : (
          menuData?.map((data, index) => {
            return (
              <Card
                minW={{ base: "sm", md: "300px" }}
                maxW={{ base: "sm", md: "300px" }}
                key={data._id}
              >
                <CardBody>
                  <Image
                    objectFit={{ base: "cover", mid: "fit" }}
                    h="260px"
                    ml={"auto"}
                    mr="auto"
                    transition={"transform .2s ease-in-out"}
                    _hover={{ cursor: "pointer" }}
                    src={`${data.src}`}
                    loading="lazy"
                  ></Image>
                  <Stack mt="6" spacing="3">
                    <Heading
                      size="md"
                      _hover={{ cursor: "pointer", color: "blue.600" }}
                      onClick={() => {
                        history(`/singlemenu/${data._id}`);
                      }}
                    >
                      {data.name}
                    </Heading>
                    <Text color="blue.600" fontSize="2xl">
                      Rs : {data.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    {cart.some((p) => p._id === data._id) ? (
                      <Button
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: data,
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
                            payload: { item: data, qty: 1 },
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
              </Card>
            );
          })
        )}
      </Flex>
    </>
  );
};

export default MenuItems;
