import { Dialog } from "@mui/material";
import React from "react";

const styles = {
  dialogHeading: {
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "20px",
  },
  fieldContainer: {
    width: "70%",
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "30px",
  },
  fieldName: {
    marginRight: "10px",
  },
};

const ContactExpanded = ({ open, handleClose, contact }) => {
  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={"sm"}>
      <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <div className="d-flex justify-content-center">
          <div style={styles.dialogHeading}>Contact Details</div>
        </div>
        <div className="d-flex justify-content-center">
          <div style={styles.fieldContainer}>
            <span style={styles.fieldName}>Name: </span>
            <span>{contact.fullName}</span>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div style={styles.fieldContainer}>
            <span style={styles.fieldName}>Phone Number: </span>
            <span> {contact.phoneNumber}</span>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div style={styles.fieldContainer}>
            <span style={styles.fieldName}>Email Id: </span>
            <span> {contact.email}</span>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div style={styles.fieldContainer}>
            <span style={styles.fieldName}>Address: </span>
            <span>{contact.address}</span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ContactExpanded;
