import React from 'react'

const SearchBar=(props)=>{
    const {type,placeholder}=props;
  return (
    <div>
    <input type={type} placeholder={placeholder}></input>
    </div>
  )
}

export default SearchBar