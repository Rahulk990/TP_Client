import { Button, Dialog, TextField } from '@mui/material';
import React from 'react';

function ContactDialog({open, handleClose, editMode, contact}) {
    const handleSaveClick = () => {
    }
    const styles = {
        dialogHeading: {
            marginTop: '10px',
            fontWeight: 'bold',
            fontSize: '20px'
        },
        inputField: {
            width: '70%',
            marginTop: '20px',
            marginBottom: '20px'
        }
    }
    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={'sm'}>
            <div style={{paddingTop: '20px', paddingBottom: '20px'}}>
            <div className='d-flex justify-content-center'>
                <div style={styles.dialogHeading}>{editMode? 'Edit Contact' : 'Add a Contact'}</div>
            </div>
            <div className='d-flex justify-content-center'>
                <TextField required id="outlined-required" label="Name" variant="outlined" style={styles.inputField} defaultValue={editMode?contact.fullName: ''}/>
            </div>
            <div className='d-flex justify-content-center'>
                <TextField id="outlined-basic" label="Phone Number" variant="outlined"  style={styles.inputField} defaultValue={editMode?contact.phoneNumber: ''} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/>
            </div>
            <div className='d-flex justify-content-center'>
                <TextField id="outlined-basic" label="Email ID" variant="outlined" style={styles.inputField} defaultValue={editMode?contact.email: ''} />
            </div>
            <div className='d-flex justify-content-center'>
                <TextField id="outlined-basic" label="Address" variant="outlined" style={styles.inputField} defaultValue={editMode?contact.address: ''} />
            </div>
            <div className='d-flex justify-content-center'>
                <Button variant="contained" onClick={handleSaveClick}>Save</Button>
            </div>
            </div>
            
        </Dialog>
    )
}

export default ContactDialog;
