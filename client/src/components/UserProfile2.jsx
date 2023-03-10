import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { getFakeProducts } from "../fakeProducts";
import { useState, useEffect } from "react";
import ProductCard from './ProductCard';
import { Box } from "@mui/system";
import Man from "../images/man.jpg";
import {Avatar} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function UserProfile2() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const obj = getFakeProducts();
    setProducts(obj);
  }, [products]);

  return (
    <div className="grid grid-cols-3 mx-40 my-10">
    <div className="col-span-1 ">
    <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
  >
    <Avatar
      alt="Sharp"
      src={Man}
      sx={{ height: 200, width: 200, borderRadius: 100 }}
    />
    {/* <Typography variant="Subtitle1">{"User Name"}</Typography> */}
    {/* <hr width="80%" /> */}
  </Box>

  <Box
    paddingTop={4}
    paddingX={4}
    display="flex"
    flexDirection="column"
    sx={{ gap: "10px" }}
  >
    <Box
      display="flex"
      flexDirection="column"
      padding={3}
      bgcolor="skyblue"
      borderRadius={3}
    >
      <Typography variant="subtitle2" color="grey">
        Name*
      </Typography>
      <Typography
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="subtitle1">User Name</Typography>
        <EditIcon />
      </Typography>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      padding={3}
      bgcolor="skyblue"
      borderRadius={3}
    >
      <Typography variant="subtitle2" color="grey">
        Email*
      </Typography>
      <Typography
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="subtitle1">
          {"User123@gmail.com"}
        </Typography>
        <EditIcon />
      </Typography>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      padding={3}
      bgcolor="skyblue"
      borderRadius={3}
    >
      <Typography variant="subtitle2" color="grey">
        Phone Number*
      </Typography>
      <Typography
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="subtitle1">
          +91 834593XXXX
        </Typography>
        <EditIcon />
      </Typography>
    </Box>
  </Box>
    </div>



    <div className="col-span-2">

    <div className='border-b-2 p-5 relative'>
    <SearchIcon className="absolute left-0 top-6 text-slate-400 " />
    <input type="text" placeholder="Search..." className='text-md rounded ml-3 p-1 w-1/2 '/>
    </div>

    <h1 className='text-2xl m-6'>My Products</h1>
    <div className='flex justify-end gap-2'>
    <select className='w-24 border-2 relative text-slate-400 rounded-xl p-2 shadow-inner'>
    <option value=" ">Filter</option>
    <option value=" ">All</option>
    <option value=" ">Subscribed</option>
    <option value=" ">Unsubscribed</option>

    </select>
    {/*<button className='w-24 border-2 relative text-slate-400 rounded-xl p-2 shadow-inner'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute w-5 h-5 text-slate-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg> <span className='ml-2'>Filter</span> </button>*/}

    <button className='w-24 border-2 bg-blue-600 text-white p-2 rounded-xl'>Add Item</button>
    </div>
   
    <div className='container  m-5'>
    <div className='grid grid-cols-3 gap-2  '>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
    </div>
    </div>
    </div>
   
    </div>
  )
}

export default UserProfile2