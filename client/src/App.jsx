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
import AdminSidebar from "./Admin/Dashboard/AdminSidebar";
import AdminDashboard from "./Admin/Dashboard/AdminDashboard";
import ProductManager from "./Admin/Dashboard/ProductManager";


/*

import Navigation from "./Components/HomePage/Navigation"
import Cards from "./Components/HomePage/cards"
import {AdminDashboard} from "./Pages/AdminDashboard"
import UserDashboard from "./Pages/UserDashboard"*/



function App(){
  const Location = useLocation();
  const hideNavigation = Location.pathname ===  "/Signup" || Location.pathname ==="/Signin" || Location.pathname.startsWith("/admin");

  return (
   <>

    {/* {!hideNavigation && <Navigation/>} */}
    {!hideNavigation && <Navbar/>}    
    {!hideNavigation && <Navigation/>}

    
    
    <Routes>
      <Route path="/" element={<Landingpage/>}/>
     <Route path="/HomePage/Navbar" element={<Navbar/>}/>
     <Route path="/Signup" element={<Signup/>}/>
     <Route path="/Signin" element={<Signin/>}/> 
     <Route path="/Landingpage" element={<Landingpage/>}/>
     <Route path="*" element={<Pagenotfound/>}/>
     <Route path="/admin/*" element={<AdminDashboard/>}/>
    </Routes>

    {!hideNavigation &&     <Footer/>}



    
    

    
   </>
  );
}
  
  



export default App


