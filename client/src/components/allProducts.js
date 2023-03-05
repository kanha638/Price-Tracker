import React from 'react'
import {useState,useEffect} from 'react';
import { getFakeProducts } from '../fakeProducts';
import SearchBar from './searchBar';
import ProductItem from './productItem';

const AllProducts=() => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
     const obj=getFakeProducts();
     setProducts(obj);
    },[products])
  return (
    <div>
    <div>
    <h3>All Products</h3>
    <SearchBar type={"text"} placeholder={"Search Product"}/>
    </div>
    {products.map(product => <ProductItem key={product.id} product={product}/>)}
    </div>
  )
}

export default AllProducts;