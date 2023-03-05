import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
const SearchBar=(props)=>{
    const {type,placeholder}=props;
  return (
    <div style={{position:"relative"}}>
    <input style={{padding:"10px"}} type={type} placeholder={placeholder}></input> 
    <SearchIcon sx={{position:"absolute"}}/>
    </div>
  )
}

export default SearchBar