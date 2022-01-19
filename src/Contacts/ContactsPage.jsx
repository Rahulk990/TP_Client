import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import AddContact from "../Components/AddContact/AddContact";
import SearchBar from "../Components/SearchBar/SearchBar";
import ContactList from "../Components/ContactList/ContactList.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../App";

const ContactsPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [contactsList, setContactsList] = useState([
    {
      fullName: "harsh",
      email: "abc@abc.com",
      phoneNumber: "2222222",
      address: "Sant Garh",
    },
    {
      fullName: "rahul",
      email: "abc@abc.com",
      phoneNumber: "333333",
      address: "delhi",
    },
  ]);

  const { authTokens } = useContext(AuthContext);
  useEffect(() => {
    console.log(authTokens);
    const url = "http://localhost:8080/userData";
    fetch(url, {
      headers: {
        Authorization: authTokens,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [authTokens]);

  // const syncScoresWithBackend = () => {
  // }

  // setInterval(syncScoresWithBackend, 5000);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "30px" }}>
        <AddContact />
      </div>
      <div style={{ marginTop: "40px" }}>
        <SearchBar />
      </div>

      <div style={{ marginTop: "50px" }}>
        <ContactList contactsList={contactsList} />
      </div>
    </>
  );
};

export { ContactsPage };
