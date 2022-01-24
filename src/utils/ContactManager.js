import { useCallback, useEffect, useState } from "react";
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
  return setInterval(fun, 10000);
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
          setContactsList(res);
        }
      })
      .catch((_) => {
        unauthorizedErrorHandler();
      });
  }, [authTokens, unauthorizedErrorHandler]);

  const fetchLatestId = useCallback(() => {
    getLatestIdAPI(authTokens)
      .then((res) => {
        if (res) {
          setLatestId(res.value);
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
        // console.log(contact);

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
        if (res && res.length) {
          processTransactions(res);
        }
      })
      .catch((_) => {
        unauthorizedErrorHandler();
      });
  }, [authTokens, latestId, processTransactions, unauthorizedErrorHandler]);

  const addContact = (contact) => {
    addContactAPI(contact, authTokens)
      .then((res) => {
        if (res) {
          setContactsList(
            [...contactsList, res].sort((a, b) =>
              ("" + a.fullName).localeCompare(b.fullName)
            )
          );
        }
      })
      .catch((_) => {
        unauthorizedErrorHandler();
      });
  };

  const updateContact = (contact) => {
    updateContactAPI(contact, authTokens)
      .then((res) => {
        setContactsList(
          contactsList.map((contact) =>
            contact.contactId === res.contactId ? res : contact
          )
        );
      })
      .catch((_) => {
        unauthorizedErrorHandler();
      });
  };

  const deleteContact = (contactId) => {
    deleteContactAPI(contactId, authTokens)
      .then((_) => {
        setContactsList(
          contactsList.filter((contact) => contact.contactId !== contactId)
        );
      })
      .catch((_) => {
        unauthorizedErrorHandler();
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
