import { toast } from "react-toastify";
import { BASE_URL } from "./globalConstants";

const sendGetRequest = (url, token) => {
  return fetch(url, {
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    if (res.status === 401) {
      toast.info("Please login again")
      throw new Error("Unauthorized");
    } else if(res.status === 400) {
      throw new Error("Bad request"); 
    } else {
      return res.json();
    }
  });
};

const sendPostRequest = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const loginUser = (data) => {
  const url = BASE_URL + "/login";
  return sendPostRequest(url, data);
};

export const registerUser = (data) => {
  const url = BASE_URL + "/register";
  return sendPostRequest(url, data);
};

export const getUserData = (token) => {
  const url = BASE_URL + "/userData";
  return sendGetRequest(url, token);
};

export const getContactsAPI = (token) => {
  const url = BASE_URL + "/contacts";
  return sendGetRequest(url, token);
};

export const addContactAPI = (contact, token) => {
  const url = BASE_URL + "/contact";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(contact),
  }).then((res) => {
    if (res.status === 401) {
      toast.info("Please login again");
    } else if(res.status === 409) {
      toast.error("Contact Already Exists");
    } else if(res.status === 400) {
      toast.error("Please enter valid values"); 
    } 
      return res.json();
    
  });
};

export const updateContactAPI = (contact, token) => {
  const url = BASE_URL + "/contact";

  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(contact),
  }).then((res) => {
      if (res.status === 401) {
        toast.info("Please login again");
      } else if(res.status === 404) {
        toast.error("Contact Not Found") 
      } else if(res.status === 400) {
        toast.error("Please enter valid values"); 
      }
      return res.json();
    }
  )
};

export const deleteContactAPI = (contactId, token) => {
  const url = BASE_URL + "/contact/" + contactId;

  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }).then((res) => {
    if (res.status === 401) {
      toast.info("Please login again");
    } else if(res.status === 404) {
      toast.error("Contact Not Found") 
    } 
    return res;
  });
};
