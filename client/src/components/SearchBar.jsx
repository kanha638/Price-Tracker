import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = (props) => {
  const { type, placeholder, onChange, value } = props;
  return (
    <div style={{ position: "relative" }}>
      <input
        style={{
          padding: "10px",
          border: "solid 1px gray",
          borderRadius: "5px",
        }}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
      <SearchIcon
        sx={{ position: "absolute", right: "10px", top: "7px", color: "gray" }}
      />
    </div>
  );
};

export default SearchBar;
