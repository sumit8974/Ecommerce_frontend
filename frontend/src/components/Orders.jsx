import {
  Card,
  CardBody,
  Heading,
  Image,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserProvider";
import { getUserOrdersfromApi } from "../api";

const Orders = () => {
  const toast = useToast();
  const { user } = UserState();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchUsersOrders = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const data = await getUserOrdersfromApi(config);
      setOrders(data.orders);
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
    if (user.name !== "nouser") fetchUsersOrders();
  }, [user]);

  if (loading) {
    return (
      <Heading textAlign="center" mt="150px">
        <Spinner
          thickness="4px"
          speed="0.5s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Heading>
    );
  }
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      mt={"100px"}
      minH={"74.7vh"}
      display={"flex"}
      mb={"80px"}
      p={"20px"}
    >
      <Heading color={"teal"} m="0px auto">
        Your Orders
      </Heading>
      {orders?.length > 0 ? (
        orders.map((order, index) => {
          return (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              maxW={"900px"}
              boxShadow="md"
              p={"0"}
              mr={"auto"}
              ml={"auto"}
              key={index}
            >
              <Image
                objectFit="fit"
                maxW={{ base: "100%", sm: "200px" }}
                src={`${order.src}`}
                alt="Caffe Latte"
                borderRight={"1px solid gray"}
                cursor={"pointer"}
              />

              <Stack>
                <CardBody>
                  <Heading size="md">{order.name}</Heading>
                  <Text py="2">{order.desc.slice(0)}</Text>
                  <Text as="b">{`Ouantity : ${order.qty}`}</Text>
                  <br />
                  <Text as="b">
                    Order Date : {order.date.toString().slice(0, 10)}
                  </Text>
                  <br />
                  <Text color="blue.600" fontSize="xl" fontWeight="medium">
                    {`Total Amount : Rs ${order.price * order.qty}`}
                  </Text>
                </CardBody>
              </Stack>
            </Card>
          );
        })
      ) : (
        <Text fontSize="20px" fontWeight="medium" textAlign="center">
          You do not have any orders...
        </Text>
      )}
    </VStack>
  );
};

export default Orders;
