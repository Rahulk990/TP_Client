import React, {useState} from "react";
import Navbar from '../Components/Navbar/Navbar';
import AddContact from '../Components/AddContact/AddContact';
import SearchBar from '../Components/SearchBar/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fab } from "@mui/material";

const ContactsPage = ({userDetails, setAuthTokens}) => {
  const [contactsList, setContactsList] = useState([]);
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
    </>
  );
};

export { ContactsPage };
