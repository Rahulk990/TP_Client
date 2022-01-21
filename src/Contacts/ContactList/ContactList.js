import React from "react";
import Contact from "./Contact";

const ContactList = ({ contactsList, isSearch }) => {
  return (
    <div>
      {contactsList.map((contact) => (
        <Contact
          key={contact.contactId}
          contact={contact}
          isSearch={isSearch}
        />
      ))}
    </div>
  );
};

export default ContactList;
