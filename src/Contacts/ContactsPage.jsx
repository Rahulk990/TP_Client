import React, {useState} from "react";
import Navbar from '../Components/Navbar/Navbar';
import AddContact from '../Components/AddContact/AddContact';
import SearchBar from '../Components/SearchBar/SearchBar';
import ContactList from '../Components/ContactList/ContactList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fab } from "@mui/material";

const ContactsPage = ({userDetails, setAuthTokens}) => {
  const [contactsList, setContactsList] = useState([
   {
     fullName: 'harsh',
     email: 'abc@abc.com',
     phoneNumber:'2222222',
     address: 'Sant Garh'
   }, 
   {
    fullName: 'rahul',
    email: 'abc@abc.com',
    phoneNumber:'333333',
    address: 'delhi'
   }
  ]);
  const syncScoresWithBackend = () => {
  }

  setInterval(syncScoresWithBackend, 5000);

  return (
    <>
        <Navbar userDetails={userDetails} setAuthTokens={setAuthTokens}/>
        <div style={{marginTop:'30px'}}>
          <AddContact/>
        </div>
        <div style={{marginTop: '40px'}}>
          <SearchBar/>
        </div>

        <div style={{marginTop: '50px'}}>
          <ContactList contactsList={contactsList}/>
        </div>
    </>
  );
};

export { ContactsPage };
