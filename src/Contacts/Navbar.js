import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import React from "react";
import { useAuth } from "../utils/contextUtils";
import { removeLocalAuthTokens } from "../utils/localStorageUtils";

const Navbar = ({ userData }) => {
  const { setAuthTokens } = useAuth();

  const logoutHandler = () => {
    removeLocalAuthTokens();
    setAuthTokens("");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <ContactPageOutlinedIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Contacts
            </Typography>
            <Avatar>{userData.fullName && userData.fullName.charAt(0)}</Avatar>
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
