import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import React from 'react'
function Navbar({userDetails, setAuthTokens}) {
    const handleLogoutClick = () => {
        localStorage.removeItem("sessionToken");
        setAuthTokens('');
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    > */}
                        <ContactPageOutlinedIcon/>
                    {/* </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Contacts
                    </Typography>
                    <Avatar>{userDetails? userDetails.fullName.charAt(0): 'HS'}</Avatar>
                    <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar
