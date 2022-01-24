export const invalidField = (field) => `Invalid ${field}`;
export const lengthError = (field, len) =>
  `${field} Must be atleast ${len} characters long`;
export const cannotBeEmpty = (field) => `${field} cannot be Empty`;

export const validateEmail = (email) => {
  if (email.trim() === "") {
    return cannotBeEmpty("Email");
  }
  if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    return invalidField("Email");
  }

  return null;
};

export const validatePassword = (password, checkLength = true) => {
  if (password.trim() === "") {
    return cannotBeEmpty("Password");
  }
  if (password.length < 8 && checkLength) {
    return lengthError("Password", 8);
  }

  return null;
};

export const validateFullName = (fullName) => {
  if (fullName.trim() === "") {
    return cannotBeEmpty("Full Name");
  }

  return null;
};

export const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber.trim() === "") {
    return cannotBeEmpty("Phone Number");
  }
  if (!phoneNumber.match(/^\d{10}$/)) {
    return invalidField("Phone Number");
  }

  return null;
};
