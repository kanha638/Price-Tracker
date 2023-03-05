import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ProductItem = (props) => {
    const {product}=props;
    const {id,name,website,currentPrice,rating,img}=product;
  return (
    <Stack direction="row" spacing={2} sx={{backgroundColor:"#F5F5F7",alignItems:"center",borderRadius:"14px"}}>
    <img src={img} alt={name}/>
    <div>
    <h4>{name}</h4> 
    <span>On {website}</span>
    </div>
    <div>{currentPrice}</div>
    <div>{rating}</div>
    <Button variant="outlined" href="#outlined-buttons">
  View
</Button>
  
    </Stack>
  )
}

export default ProductItem