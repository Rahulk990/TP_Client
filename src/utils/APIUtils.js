import {
  BASE_URL,
  ERROR_EMAIL_EXISTS,
  ERROR_WRONG_CREDENTIALS,
} from "./globalConstants";

const sendGetRequest = (url, token) => {
  return fetch(url, {
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 500) {
      return null;
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
  return sendPostRequest(url, data).then((res) => {
    if (res.status === 404 || res.status === 400) {
      return ERROR_WRONG_CREDENTIALS;
    } else if (res.status === 500) {
      return null;
    } else {
      return res.json();
    }
  });
};

export const registerUser = (data) => {
  const url = BASE_URL + "/register";
  return sendPostRequest(url, data).then((res) => {
    if (res.status === 409 || res.status === 400) {
      return ERROR_EMAIL_EXISTS;
    } else if (res.status === 500) {
      return null;
    } else {
      return res.json();
    }
  });
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
    } else if (res.status === 409) {
      alert("Contact Already Exists");
      return null;
    } else if (res.status === 500) {
      return null;
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
    } else if (res.status === 404) {
      alert("Contact Not Found");
      return null;
    } else if (res.status === 500) {
      return null;
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
      Authorization: token,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 404) {
      alert("Contact Not Found");
      return null;
    } else if (res.status === 500) {
      return null;
    } else {
      return res.text();
    }
  });
};

export const getLatestIdAPI = (token) => {
  const url = BASE_URL + "/latestId";

  return fetch(url, {
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 500) {
      return null;
    } else {
      return res.json();
    }
  });
};

export const getLatestUpdatesAPI = (token, latestId) => {
  const url = BASE_URL + "/updates/" + latestId;

  return fetch(url, {
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    } else if (res.status === 500) {
      return null;
    } else {
      return res.json();
    }
  });
};
