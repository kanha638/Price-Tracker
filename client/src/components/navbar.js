import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';


const Navbar = () => {
  return (
    <div style={{borderRadius:"24px",padding:"25px 30px",display:"flex",height:"90vh",border:"1px solid black",position:"absolute",background: "#0C0B0B",color:"white",flexDirection:"column",justifyContent:"space-between",flexWrap:"wrap"}}>

   <div style={{flex:"1"}}>
   <h1>PT</h1>
   </div>

   <div style={{display:"flex" ,flexDirection:"column", flex:"2",justifyContent:"space-evenly",alignItems:"center"}}>
   <HomeIcon/>
   <MessageIcon/>
   <PersonIcon/>
   <SettingsIcon/>
   </div>

   <div style={{flex:"1",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
   <LogoutIcon/>
   </div>

    </div>
  )
}

export default Navbar