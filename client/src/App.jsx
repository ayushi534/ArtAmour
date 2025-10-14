import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/HomePage/Navbar";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Landingpage from "./Components/HomePage/Landingpage";
import Navigation from "./Components/HomePage/Navigation";
import Footer from "./Components/common/Footer";
import Pagenotfound from "./Components/Pagenotfound"
import AdminNav from "./Admin/Dashboard/AdminNav"


/*

import Navigation from "./Components/HomePage/Navigation"
import Cards from "./Components/HomePage/cards"
import {AdminDashboard} from "./Pages/AdminDashboard"
import UserDashboard from "./Pages/UserDashboard"*/



function App(){
  const Location = useLocation();
  const hideNavigation = Location.pathname ===  "/Signup" || Location.pathname ==="/Signin"
  const hideNavbar = Location.pathname === "/Signup" || Location.pathname ==="/Signin"

  return (
   <>
   <Navbar/>
   <Navigation/>
    {hideNavigation && <Navigation/>}
    {hideNavbar && <Navbar/>}    
    <Routes>
      <Route path="/" element={<Landingpage/>}/>
     <Route path="/HomePage/Navbar" element={<Navbar/>}/>
     <Route path="/Signup" element={<Signup/>}/>
     <Route path="/Signin" element={<Signin/>}/> 
     <Route path="/Landingpage" element={<Landingpage/>}/>
     <Route path="*" element={<Pagenotfound/>}/>
    </Routes>

    <Footer/>
    <AdminNav/>
    
   </>
  );
}
  
  



export default App


