import { TextField } from "@mui/material";
import React, { useState } from "react";

function SearchBar({ filterList }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <TextField
      label="Search Contact"
      type="search"
      variant="outlined"
      style={{ width: "70%" }}
      value={searchValue}
      onChange={(e) => {
        e.target.value === "" && filterList("");
        setSearchValue(e.target.value);
      }}
      onKeyDown={(e) => {
        e.key === "Enter" && filterList(searchValue.toUpperCase());
      }}
    />
  );
}

export default SearchBar;
