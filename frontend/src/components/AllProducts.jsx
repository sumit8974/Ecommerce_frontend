import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { deleteProductById, fetchMenusFromApi } from "../api";

const AllProducts = () => {
  const [menus, setMenus] = useState([]);
  const { user } = UserState();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const data = await fetchMenusFromApi();
      setLoading(false);
      setMenus(data);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Could not Load the products",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
  async function deleteProduct(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      await deleteProductById(id, config);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Could not delete product...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    fetchMenus();
  }
  useEffect(() => {
    fetchMenus();
  }, []);
  return (
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
        <Heading>
          <Spinner
            thickness="4px"
            speed="0.5s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </Heading>
      ) : (
        menus.map((data, index) => {
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
                  <Heading size="md">{data.name}</Heading>
                  <Text color="blue.600" fontSize="2xl">
                    Rs : {data.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button
                  variant="solid"
                  colorScheme="teal"
                  onClick={() => deleteProduct(data._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })
      )}
    </Flex>
  );
};

export default AllProducts;
