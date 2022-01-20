import { Fab } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ContactDialog from "./ContactDialog";

const AddContact = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="d-flex justify-content-center">
      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <ContactDialog
        open={open}
        handleClose={() => setOpen(false)}
        editMode={false}
      />
    </div>
  );
};

export default AddContact;
