import { Card } from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactDialog from "../ContactDialog";
import ContactExpanded from "./ContactExpanded";
import { useContact } from "../../utils/contextUtils";

const styles = {
  container: {
    width: "80%",
    backgroundColor: "white",
    fontSize: "30px",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  icon: {
    margin: "0 5px",
    cursor: "pointer",
  },
};

const Contact = ({ contact, isSearch }) => {
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { updateContact, deleteContact } = useContact();

  const deleteHandler = () => {
    deleteContact(contact.contactId);
  };

  const viewHandler = () => {
    setOpenView(true);
    isSearch && updateContact({ ...contact, score: contact.score + 1 });
  };

  return (
    <div className="d-flex justify-content-center">
      <Card
        variant="outlined"
        style={styles.container}
        className="d-flex justify-content-between align-items-center"
      >
        <span style={{ marginRight: "10px" }}>{contact.fullName}</span>
        <span>{contact.phoneNumber}</span>
        <div className="d-flex justify-content-between">
          <VisibilityIcon style={styles.icon} onClick={viewHandler} />
          <ContactExpanded
            open={openView}
            handleClose={() => setOpenView(false)}
            contact={contact}
          />
          <EditIcon style={styles.icon} onClick={() => setOpenEdit(true)} />
          <ContactDialog
            open={openEdit}
            handleClose={() => setOpenEdit(false)}
            editMode={true}
            contact={contact}
          />
          <DeleteIcon style={styles.icon} onClick={deleteHandler} />
        </div>
      </Card>
    </div>
  );
};

export default Contact;
