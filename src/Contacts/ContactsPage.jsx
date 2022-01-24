import React, { useEffect, useState } from "react";
import AddContact from "./AddContact";
import SearchBar from "./SearchBar";
import ContactList from "./ContactList/ContactList.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContact } from "../utils/contextUtils";
import { Box } from "@mui/system";
import { filterAndSortList } from "../utils/filterUtil";
import { useDebounce } from "../utils/debounceUtil";

const ContactsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const { contactsList } = useContact();

  const debouncedSearchValue = useDebounce(searchValue.toUpperCase(), 500);
  useEffect(() => {
    debouncedSearchValue === ""
      ? setFilteredList([])
      : setFilteredList(filterAndSortList(contactsList, debouncedSearchValue));
  }, [debouncedSearchValue, contactsList]);

  const contactsListProp =
    debouncedSearchValue === "" ? contactsList : filteredList;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
            width: "80%",
            alignSelf: "center",
          }}
        >
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <AddContact />
        </Box>
        <div style={{ marginTop: "50px", width: "80%" }}>
          <ContactList
            contactsList={contactsListProp}
            isSearch={debouncedSearchValue !== ""}
          />
        </div>
      </Box>
    </>
  );
};

export default ContactsPage;
