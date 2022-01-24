import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addContactAPI,
  deleteContactAPI,
  getContactsAPI,
  updateContactAPI,
} from "./APIUtils";
import { useAuth } from "./contextUtils";
import { removeLocalAuthTokens } from "./localStorageUtils";

const syncManager = (fun) => {
  return setInterval(fun, 60000);
};

const ContactManager = () => {
  const [contactsList, setContactsList] = useState([]);
  const { authTokens, setAuthTokens } = useAuth();

  const unauthorizedErrorHandler = useCallback(() => {
    removeLocalAuthTokens();
    setAuthTokens("");
  }, [setAuthTokens]);

  const fetchContactList = useCallback(() => {
    getContactsAPI(authTokens)
      .then((res) => {
        setContactsList(res);
      })
      .catch((_) => {
        unauthorizedErrorHandler();
      });
  }, [authTokens, unauthorizedErrorHandler]);

  const addContact = (contact) => {
    addContactAPI(contact, authTokens)
      .then((res) => {
        if(!res.statusCode) {
          setContactsList(
            [...contactsList, res].sort((a, b) =>
              ("" + a.fullName).localeCompare(b.fullName)
            )
          );
        }
      })
      .catch((_) => {
        toast.error("Server Error");
        unauthorizedErrorHandler();
      });
  };

  const updateContact = (contact) => {
    updateContactAPI(contact, authTokens)
      .then((res) => {
        if(!res.statusCode) {
          setContactsList(
            contactsList.map((contact) =>
              contact.contactId === res.contactId ? res : contact
            )
          );
        }
      })
      .catch((_) => {
       toast.error("Server Error");
        unauthorizedErrorHandler();
      });
  };

  const deleteContact = (contactId) => {
    deleteContactAPI(contactId, authTokens)
      .then((res) => {
        if(res.status === 200) {
          setContactsList(
            contactsList.filter((contact) => contact.contactId !== contactId)
          );
        }
      })
      .catch((_) => {
        toast.error("Server Error");
        unauthorizedErrorHandler();
      });
  };

  useEffect(() => {
    fetchContactList();
    let intervalId = syncManager(fetchContactList);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchContactList]);

  return { contactsList, addContact, updateContact, deleteContact };
};

export default ContactManager;
