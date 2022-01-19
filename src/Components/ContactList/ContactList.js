import React from 'react';
import Contact from './Contact';
function ContactList({contactsList}) {
    const contactsComponent = contactsList.map(contact => <Contact contact={contact}/>)
  return <div>
      {contactsComponent}
  </div>;
}

export default ContactList;
