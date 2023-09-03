import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyIsAdmin } from "../api";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "nouser" });
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useNavigate();
  // console.log(user);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    // console.log("context");
    if (userInfo) {
      setUser(userInfo);
    }
  }, [history]);
  async function checkIsAdmin() {
    const userToken = userInfo?.token;
    if (!userToken) return;
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const data = await verifyIsAdmin(config);
    setIsAdmin(data.isAdmin);
  }
  useEffect(() => {
    checkIsAdmin();
  }, [history]);
  return (
    <UserContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
