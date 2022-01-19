import { Fab } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import ContactDialog from '../ContactDialog/ContactDialog';
function AddContact() {
    const [open, setOpen] = React.useState(false);
    const handleAddContactClick = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div className='d-flex justify-content-center'>
            <Fab color="primary" aria-label="add" onClick={handleAddContactClick}>
                <AddIcon />
            </Fab>
            <ContactDialog open={open} handleClose={handleClose} editMode={false}/>
        </div>
    )
}

export default AddContact
