import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import AddContact from "./AddContact";
import SearchBar from "./SearchBar";
import ContactList from "./ContactList/ContactList.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth, useContact } from "../utils/contextUtils";
import { getUserData } from "../utils/APIUtils";
import { removeLocalAuthTokens } from "../utils/localStorageUtils";
import { Box } from "@mui/system";
import { filterAndSortList } from "../utils/filterUtil";
import { ToastContainer } from "react-toastify";

const ContactsPage = () => {
  const [userData, setUserData] = useState({});
  const [filteredList, setFilteredList] = useState([]);
  const { authTokens, setAuthTokens } = useAuth();
  const { contactsList } = useContact();

  useEffect(() => {
    getUserData(authTokens)
      .then((res) => {
        setUserData(res);
      })
      .catch((_) => {
        removeLocalAuthTokens();
        setUserData({});
        setAuthTokens("");
      });
  }, [authTokens, setAuthTokens]);

  const filterList = useCallback(
    (value) => {
      value === ""
        ? setFilteredList([])
        : setFilteredList(filterAndSortList(contactsList, value));
    },
    [contactsList]
  );

  const contactsListProp = filteredList.length ? filteredList : contactsList;

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
          contactsList={contactsListProp}
          isSearch={filteredList.length}
        />
      </div>
      <ToastContainer position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </>
  );
};

export default ContactsPage;
