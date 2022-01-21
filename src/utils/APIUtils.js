import { BASE_URL } from "./globalConstants";

const sendGetRequest = (url, token) => {
  return fetch(url, {
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
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
  }).then((res) => res.text());
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
      throw new Error("Unauthorized");
    } else if(res.status === 409) {
      throw new Error("Contact Already Exists") 
    } else {
      return res.json();
    }
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
      throw new Error("Unauthorized");
    } else if(res.status === 404) {
      throw new Error("Contact Not Found") 
    } else {
      return res.json();
    }
  });
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
      throw new Error("Unauthorized");
    } else if(res.status === 404) {
      throw new Error("Contact Not Found") 
    } else {
      return res.text();
    }
  });
};
