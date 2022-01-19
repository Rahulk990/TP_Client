import { TextField } from '@mui/material'
import React from 'react'

function SearchBar() {
    return (
        <div className='d-flex justify-content-center'>
            <TextField id="outlined-basic" label="Contact Name" type='search' variant="outlined" style={{width: '60%'}}/>
        </div>
    )
}

export default SearchBar
