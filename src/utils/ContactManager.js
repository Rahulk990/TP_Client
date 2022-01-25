import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addContactAPI,
  deleteContactAPI,
  getContactsAPI,
  getLatestIdAPI,
  getLatestUpdatesAPI,
  updateContactAPI,
} from "./APIUtils";
import { useAuth } from "./contextUtils";
import { removeLocalAuthTokens } from "./localStorageUtils";

const syncManager = (fun) => {
  return setInterval(fun, 2000);
};

const ContactManager = () => {
  const [latestId, setLatestId] = useState(null);
  const [contactsList, setContactsList] = useState([]);
  const { authTokens, setAuthTokens } = useAuth();

  const unauthorizedErrorHandler = useCallback(() => {
    removeLocalAuthTokens();
    setAuthTokens("");
  }, [setAuthTokens]);

  const fetchContactList = useCallback(() => {
    getContactsAPI(authTokens)
      .then((res) => {
        if (res) {
          setContactsList(res.contactList);
        }
      })
      .catch((_) => {
        unauthorizedErrorHandler();
      });
  }, [authTokens, unauthorizedErrorHandler]);

  const fetchLatestId = useCallback(() => {
    getLatestIdAPI(authTokens)
      .then((res) => {
        if (res && !res.statusCode) {
          // console.log(res.latestId);
          setLatestId(res.latestId);
          fetchContactList();
        }
      })
      .catch((_) => {
        unauthorizedErrorHandler();
      });
  }, [authTokens, fetchContactList, unauthorizedErrorHandler]);

  const processTransactions = useCallback(
    (transactions) => {
      let updatedContactsList = contactsList.slice();
      transactions.forEach((transaction) => {
        const contact = JSON.parse(transaction.transactionString);
        // console.log(transaction);

        if (contact.isDeleted) {
          updatedContactsList = updatedContactsList.filter(
            (cnt) => cnt.contactId !== contact.contactId
          );
        } else if (
          updatedContactsList.findIndex(
            (cnt) => cnt.contactId === contact.contactId
          ) > -1
        ) {
          updatedContactsList = updatedContactsList.map((cnt) =>
            cnt.contactId === contact.contactId ? contact : cnt
          );
        } else {
          updatedContactsList = [...updatedContactsList, contact].sort((a, b) =>
            ("" + a.fullName).localeCompare(b.fullName)
          );
        }
      });

      setContactsList(updatedContactsList);
      setLatestId(transactions[transactions.length - 1].transactionId);
    },
    [contactsList]
  );

  const fetchLatestUpdates = useCallback(() => {
    getLatestUpdatesAPI(authTokens, latestId)
      .then((res) => {
      
        if (res && !res.statusCode && res.transactionList.length) {
          processTransactions(res.transactionList);
        }
      })
      .catch((_) => {
        //unauthorizedErrorHandler();
      });
  }, [authTokens, latestId, processTransactions]);

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
        //unauthorizedErrorHandler();
      });
  };

  const updateContact = (contact, isScoreUpdate) => {
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
        if(!isScoreUpdate){
          toast.error("Server Error");
        }
        //unauthorizedErrorHandler();
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
        //unauthorizedErrorHandler();
      });
  };

  useEffect(() => {
    fetchLatestId();
  }, [fetchLatestId]);

  useEffect(() => {
    let intervalId = syncManager(fetchLatestUpdates);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchLatestUpdates]);

  return { contactsList, addContact, updateContact, deleteContact };
};

export default ContactManager;
