import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AddContact from "./AddContact";
import SearchBar from "./SearchBar";
import ContactList from "./ContactList/ContactList.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../utils/contextUtils";
import { getContacts, getUserData } from "../utils/APIUtils";
import { removeLocalAuthTokens } from "../utils/localStorageUtils";
import { Box } from "@mui/system";
import { filterAndSortList } from "../utils/filterUtil";

const ContactsPage = () => {
  const [userData, setUserData] = useState({});
  const [contactsList, setContactsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { authTokens, setAuthTokens } = useAuth();

  const unauthorizedErrorHandler = () => {
    removeLocalAuthTokens();
    setUserData({});
    setAuthTokens("");
  };

  const fetchContactList = () => {
    // getContacts(authTokens)
    //   .then((res) => {
    //     console.log(res);
    //     setContactsList(res);
    //   })
    //   .catch((_) => {
    //     unauthorizedErrorHandler();
    //   });

    setContactsList(getContacts(authTokens));
  };

  const startScoreUpdater = () => {
    fetchContactList();
    setInterval(fetchContactList, 60000);
  };

  useEffect(() => {
    getUserData(authTokens)
      .then((res) => {
        setUserData(res);
        startScoreUpdater();
      })
      .catch((_) => {
        unauthorizedErrorHandler();
      });
  }, [authTokens, setAuthTokens]);

  const filterList = (value) => {
    value === ""
      ? setFilteredList([])
      : setFilteredList(filterAndSortList(contactsList, value));
  };

  return (
    <>
      <Navbar userData={userData} />
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          flex: 1,
          gap: 10,
          padding: "0 40px",
        }}
      >
        <SearchBar filterList={filterList} />
        <AddContact />
      </Box>
      <div style={{ marginTop: "50px" }}>
        <ContactList
          contactsList={filteredList.length ? filteredList : contactsList}
        />
      </div>
    </>
  );
};

export { ContactsPage };
