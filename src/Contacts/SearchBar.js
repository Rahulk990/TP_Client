import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function SearchBar({ filterList }) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    searchValue === "" && filterList("");
  }, [searchValue, filterList]);

  return (
    <TextField
      label="Search Contact"
      type="search"
      variant="outlined"
      style={{ width: "70%" }}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={(e) => {
        e.key === "Enter" && filterList(searchValue.toUpperCase());
      }}
    />
  );
}

export default SearchBar;
