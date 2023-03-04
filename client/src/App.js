import * as React from "react";

import EnterEmail from "./components/pages/enterEmail";
//import { Button, } from '@mui/material';


// import DashBoard from "./components/pages/dashBoard";
// import PrimarySearchAppBar from "./components/pages/navbar";
import ForgetPassword from "./components/pages/resetPassword";
import SignIn from "./components/pages/signIn";
import SignUp from "./components/pages/signUp";

const App = () => {
  return (
    // <div className="App">
    //     <Button variant="contained">Hello World</Button>
    // </div>
    <>
      {/* <PrimarySearchAppBar/> */}
        {/* <DashBoard/> */}
        <SignIn/>
        <SignUp/>
        <ForgetPassword/>
        <EnterEmail/>
    </>

  );
}

export default App;
