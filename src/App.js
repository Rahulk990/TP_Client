import {useState, useEffect } from "react";
import "./App.css";
import { ContactsPage } from "./Contacts";
import { LoginPage } from "./Login";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const existingTokens = localStorage.getItem("authToken");
  const [authTokens, setAuthTokens] = useState(existingTokens);
  useEffect(() => {
    console.log('Something');
    fetch("http://localhost:8080/status")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      });

    console.log(localStorage.getItem("sessionToken"));
    setAuthTokens(localStorage.getItem("sessionToken"));
  }, []);

  // const authTokens = localStorage.getItem("sessionToken");

  return (
    <div>
      Hello World
      {authTokens ? <LoginPage /> : <ContactsPage userDetails={userDetails} setAuthTokens={setAuthTokens}/>}
    </div>
  );
}

export default App;
