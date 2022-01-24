import { useState } from "react";
import "./App.css";
import LoginPage from "./Login/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext, ContactContext } from "./utils/contextUtils";
import ContactManager from "./utils/ContactManager";
import ContactsMain from "./Contacts/ContactsMain";

const ContactsWrapper = () => {
  return (
    <ContactContext.Provider value={ContactManager()}>
      <ContactsMain />
    </ContactContext.Provider>
  );
};

const App = () => {
  const existingTokens = localStorage.getItem("authToken");
  const [authTokens, setAuthTokens] = useState(existingTokens);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens }}>
      {authTokens ? <ContactsWrapper /> : <LoginPage />}
    </AuthContext.Provider>
  );
};

export default App;
