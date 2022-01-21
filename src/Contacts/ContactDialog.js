import { Button, Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import { useContact } from "../utils/contextUtils";
import {
  validateEmail,
  validateFullName,
  validatePhoneNumber,
} from "../utils/validatorUtil";

const STATE_CONTACT_DATA = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
};

const STATE_CONTACT_ERROR = {
  fullName: null,
  email: null,
  phoneNumber: null,
  address: null,
};

const styles = {
  dialogHeading: {
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "20px",
  },
  inputField: {
    width: "70%",
    marginTop: "20px",
    marginBottom: "20px",
  },
};

function merge(obj1, obj2) {
  for (var p in obj2) if (obj1.hasOwnProperty(p)) obj1[p] = obj2[p];
  return obj1;
}

const ContactDialog = ({ open, handleClose, editMode, contact }) => {
  const initialState = editMode
    ? merge({ ...STATE_CONTACT_DATA }, contact)
    : STATE_CONTACT_DATA;

  const { addContact, updateContact } = useContact();
  const [contactData, setContactData] = useState(initialState);
  const [contactError, setContactError] = useState(STATE_CONTACT_ERROR);

  const changeHandler = (prop) => (event) => {
    setContactError({ ...contactError, [prop]: null });
    setContactData({ ...contactData, [prop]: event.target.value });
  };

  const validate = () => {
    const fullNameError = validateFullName(contactData.fullName);
    const emailError = validateEmail(contactData.email);
    const phoneNumberError = validatePhoneNumber(contactData.phoneNumber);

    if (emailError || phoneNumberError || fullNameError) {
      setContactError({
        fullName: fullNameError,
        email: emailError,
        phoneNumber: phoneNumberError,
      });
      return false;
    }

    return true;
  };

  const saveHandler = () => {
    if (validate()) {
      editMode
        ? updateContact(merge(contact, contactData))
        : addContact(contactData);
      handleClose();
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={"sm"}>
      <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <div className="d-flex justify-content-center">
          <div style={styles.dialogHeading}>
            {editMode ? "Edit Contact" : "Add a Contact"}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <TextField
            required
            error={!!contactError.fullName}
            label="Full Name"
            variant="outlined"
            style={styles.inputField}
            value={contactData.fullName}
            onChange={changeHandler("fullName")}
            helperText={contactError.fullName}
          />
        </div>
        <div className="d-flex justify-content-center">
          <TextField
            required
            error={!!contactError.phoneNumber}
            label="Phone Number"
            variant="outlined"
            style={styles.inputField}
            value={contactData.phoneNumber}
            onChange={changeHandler("phoneNumber")}
            helperText={contactError.phoneNumber}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <TextField
            required
            error={!!contactError.email}
            label="Email ID"
            variant="outlined"
            style={styles.inputField}
            value={contactData.email}
            onChange={changeHandler("email")}
            helperText={contactError.email}
          />
        </div>
        <div className="d-flex justify-content-center">
          <TextField
            label="Address"
            variant="outlined"
            style={styles.inputField}
            value={contactData.address}
            onChange={changeHandler("address")}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="contained" onClick={saveHandler}>
            {editMode ? "Save" : "Add"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ContactDialog;
