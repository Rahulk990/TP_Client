import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserData } from "../utils/APIUtils";
import { useAuth } from "../utils/contextUtils";
import { removeLocalAuthTokens } from "../utils/localStorageUtils";
import ContactsPage from "./ContactsPage";
import Navbar from "./Navbar";

const ContactsMain = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { authTokens, setAuthTokens } = useAuth();

  useEffect(() => {
    getUserData(authTokens)
      .then((res) => {
        if (res) {
          setUserData(res);
          setIsLoading(false);
        }
      })
      .catch((_) => {
        removeLocalAuthTokens();
        setUserData({});
        setAuthTokens("");
      });
  }, [authTokens, setAuthTokens]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Navbar userData={userData} />
          <ContactsPage />
        </>
      )}
    </>
  );
};

export default ContactsMain;
