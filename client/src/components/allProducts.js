import React from 'react'
import {useState,useEffect} from 'react';
import { getFakeProducts } from '../fakeProducts';
import SearchBar from './searchBar';
import ProductItem from './productItem';
import Stack from '@mui/material/Stack';

const AllProducts=() => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
     const obj=getFakeProducts();
     setProducts(obj);
    },[products])
  return (
    <div style={{width:"500px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <h3>All Products</h3>
    <SearchBar type={"text"} placeholder={"Search Product"}/>
    </div>
    <Stack spacing={2}>
    {products.map(product => <ProductItem key={product.id} product={product}/>)}
    </Stack>
    </div>
  )
}

export default AllProducts;