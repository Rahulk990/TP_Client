import { TextField } from "@mui/material";
import React from "react";

function SearchBar({ searchValue, setSearchValue }) {
  return (
    <TextField
      label="Search Contact"
      type="search"
      variant="outlined"
      style={{ width: "80%" }}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
}

export default SearchBar;
