import { useEffect } from "react";
import "./App.css";
import { ContactsPage } from "./Contacts";
import { LoginPage } from "./Login";

function App() {
  useEffect(() => {
    fetch("http://localhost:8080/status")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      });

    console.log(localStorage.getItem("sessionToken"));
  }, []);

  const authTokens = localStorage.getItem("sessionToken");

  return (
    <div>
      Hello World
      {authTokens ? <LoginPage /> : <ContactsPage />}
    </div>
  );
}

export default App;
