import { Button, Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import { STATE_CONTACT_DATA } from "../utils/globalConstants";

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
    ? STATE_CONTACT_DATA
    : merge(STATE_CONTACT_DATA, contact);

  const [contactData, setContactData] = useState(initialState);
  const changeHandler = (prop) => (event) => {
    setContactData({ ...contactData, [prop]: event.target.value });
  };

  const saveHandler = () => {
    console.log(contactData);
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
            label="Full Name"
            variant="outlined"
            style={styles.inputField}
            value={contactData.fullName}
            onChange={changeHandler("fullName")}
          />
        </div>
        <div className="d-flex justify-content-center">
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            style={styles.inputField}
            value={contactData.phoneNumber}
            onChange={changeHandler("phoneNumber")}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <TextField
            id="outlined-basic"
            label="Email ID"
            variant="outlined"
            style={styles.inputField}
            value={contactData.email}
            onChange={changeHandler("email")}
          />
        </div>
        <div className="d-flex justify-content-center">
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            style={styles.inputField}
            value={contactData.address}
            onChange={changeHandler("address")}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="contained" onClick={saveHandler}>
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ContactDialog;
