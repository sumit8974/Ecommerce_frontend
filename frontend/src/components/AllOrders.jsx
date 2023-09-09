import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserProvider";
import { fetchAllOrdersfromApi } from "../api";

const AllOrders = () => {
  const toast = useToast();
  const { user } = UserState();
  const [Allorders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const data = await fetchAllOrdersfromApi(config);
      setOrders(data);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <Box maxWidth={"900px"} margin={"auto"}>
        <Heading as="h5" size="md" mb={"10px"}>
          All Orders per user
        </Heading>
        {isLoading ? (
          <Heading textAlign="center" mt="30px">
            <Spinner
              thickness="4px"
              speed="0.5s"
              emptyColor="gray.200"
              color="teal.500"
              size="xl"
            />
          </Heading>
        ) : (
          Allorders?.map((o) => (
            <Accordion allowMultiple key={o._id}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign={"left"}>
                      {o._id}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <Flex
                    w={"90%"}
                    ml="auto"
                    mr={"auto"}
                    gap={"10"}
                    flexWrap="wrap"
                    alignItems={"center"}
                    justifyContent="center"
                    position="relative"
                  >
                    {o.orders.map((ord, index) => (
                      <Card
                        minW={{ base: "sm", md: "300px" }}
                        maxW={{ base: "sm", md: "300px" }}
                        key={index}
                      >
                        <CardBody>
                          <Image
                            objectFit={{ base: "cover", mid: "fit" }}
                            h="260px"
                            ml={"auto"}
                            mr="auto"
                            transition={"transform .2s ease-in-out"}
                            _hover={{
                              cursor: "pointer",
                            }}
                            src={`${ord.src}`}
                            loading="lazy"
                          ></Image>
                          <Stack mt="6" spacing="0">
                            <Heading size="md">{ord.name}</Heading>
                            <Text color="blue.600" fontSize="2xl">
                              Rs {ord.price}
                            </Text>
                            <Text>Quantity : {ord.qty}</Text>
                            <Text>
                              Order Date : {ord.date.toString().slice(0, 10)}
                            </Text>
                          </Stack>
                        </CardBody>
                      </Card>
                    ))}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </Box>
    </>
  );
};

export default AllOrders;
