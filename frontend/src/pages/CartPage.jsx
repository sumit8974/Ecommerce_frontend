import React from "react";
import CartItems from "../components/CartItems";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";

const CartPage = () => {
  return (
    <>
      <Navbar />
      <CartItems />
      {/* <Footer /> */}
    </>
  );
};

export default CartPage;
