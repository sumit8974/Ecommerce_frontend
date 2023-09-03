import "./App.css";
import HomePage from "./pages/HomePage";
import MenusPage from "./pages/MenusPage";
import SingleItemPage from "./pages/SingleItemPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<MenusPage />} />
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/singlemenu/:id" element={<SingleItemPage />} />
      <Route exact path="/cart" element={<CartPage />} />
      <Route exact path="/orders" element={<OrdersPage />} />
      <Route exact path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
