import { Card } from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactDialog from '../ContactDialog/ContactDialog';
import ContactExpanded from './ContactExpanded';

function Contact({contact}) {
    const [openView, setOpenView] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleExpandViewClick = () => {
        setOpenView(true);
    }
    const handleViewClose = () => {
        setOpenView(false);
    }
    const handleEditClick = () => {
        setOpenEdit(true);
    }
    const handleEditClose = () => {
        setOpenEdit(false);
    }
    const handleDeleteClick = () => {
        
    }
    const styles = {
        container: {
            width: '80%',
            backgroundColor: 'white',
            fontSize: '30px',
            padding: '10px',
            marginTop: '10px',
            marginBottom: '10px'
        },
        icon: {
            margin: '0 5px',
            cursor: 'pointer'
        }
    }
  return <div className='d-flex justify-content-center'>
  <Card variant='outlined' style={styles.container} className='d-flex justify-content-between align-items-center'>
      <span style={{marginRight: '10px'}}>{contact.fullName}</span>
      <span>{contact.phoneNumber}</span>
       <div className='d-flex justify-content-between'>
        <VisibilityIcon style={styles.icon} onClick={handleExpandViewClick}/>
        <ContactExpanded open={openView} handleClose={handleViewClose} contact={contact}/>
        <EditIcon style={styles.icon} onClick={() => handleEditClick(true)}/>
        <ContactDialog open={openEdit} handleClose={handleEditClose} editMode={true} contact={contact}/>
        <DeleteIcon style={styles.icon} handleClick={handleDeleteClick}/> 
    </div> 
  </Card> 
  </div> 
}

export default Contact;
