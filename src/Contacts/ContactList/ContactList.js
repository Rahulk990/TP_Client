import React from "react";
import Contact from "./Contact";

const ContactList = ({ contactsList }) => {
  return (
    <div>
      {contactsList.map((contact) => (
        <Contact key={contact.contactId} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;
