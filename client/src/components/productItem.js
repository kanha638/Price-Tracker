import React from 'react'

const productItem = (props) => {
    const {product}=props;
    const {id,name,website,currentPrice,rating,img}=product;
  return (
    <div  style={{display:"flex",justifyContent:"space-between",width:600,border:"solid black",background:"F5F5F7"}}>
    
    <img src={img} alt={name}/>
    <h4>{name} <br/> <span>On {website}</span></h4>
    <div>{currentPrice}</div>
    <div>{rating}</div>
    <button className="btn btn-primary btn-sm">View</button>
    </div>
  )
}

export default productItem