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

export const getContacts = (token) => {
  const url = BASE_URL + "/getContacts";
  // return sendGetRequest(url, token);

  return [
    {
      contactId: 123,
      fullName: "rharsh",
      email: "abc@abc.com",
      phoneNumber: "2222222",
      address: "Sant Garh",
      score: 2,
    },
    {
      contactId: 1233,
      fullName: "rahul",
      email: "abc@abc.com",
      phoneNumber: "333333",
      address: "delhi",
      score: 5,
    },
  ];
};
