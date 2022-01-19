import { SubtitlesOutlined } from '@mui/icons-material'
import { Dialog, DialogTitle, TextField } from '@mui/material'
import React from 'react'

function AddContactDialog({open, handleClose}) {
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
            <div className='d-flex justify-content-center'>
                <div style={styles.dialogHeading}>Add a Contact</div>
            </div>
            <div className='d-flex justify-content-center'>
                <TextField required id="outlined-basic" label="Name" variant="outlined" style={styles.inputField}/>
            </div>
            <div className='d-flex justify-content-center'>
                <TextField id="outlined-basic" label="Email Address" variant="outlined" style={styles.inputField} />
            </div>
            <div className='d-flex justify-content-center'>
                <TextField id="outlined-basic" label="Phone Number" variant="outlined"  style={styles.inputField} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/>
            </div>
        </Dialog>
    )
}

export default AddContactDialog
