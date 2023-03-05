import React from 'react'

const ProductItem = (props) => {
    const {product}=props;
    const {id,name,website,currentPrice,rating,img}=product;
  return (
    <div className='product-item'>
    <img src={img} alt={name}/>
    <h4>{name} <br/> <span>On {website}</span></h4>
    <div>{currentPrice}</div>
    <div>{rating}</div>
    <button className="btn btn-primary btn-sm">View</button>
    </div>
  )
}

export default ProductItem