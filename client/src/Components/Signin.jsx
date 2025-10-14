import React from 'react'
import {Link} from"react-router-dom";
import Images from "../assets/Background.jpeg";


const Signin = () => {
  return (
    <section className="min-h-screen flex items-center justify-center font-sans ">
    <div className="flex shadow-2xl">

      <div className='absolute inset-0'>
        <img src={Images} alt='Art Background' className='w-full h-full object-cover blur-sm scale-105'/>
        <div className='absolute inset-0 bg-Brown mix-blend-multiply'></div>
      </div>

      <div className="relative bg-amber-50 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-[100%]  max-w-md text-center text-Brown">
        <h1 className="text-4xl font-serif">Welcome To ArtAmour</h1>
        <p className='text-sm mb-8 text-Redwood '> Login to explore exclusive collections of art and creativity</p>

        <div className="flex flex-col text-xl text-left gap-2">
          <span>Username</span>
          <input type="text" placeholder='Enter your Name' className="rounded-md  p-1 border-2 outline-none focus:border-Brown focus:bg-slate-50"/>
        </div>

        <div className="flex flex-col text-xl text-left gap-2">
          <span>Password</span>
          <input type="password" placeholder='Enter your Password' className="rounded-md p-1 border-2 outline-none focus:border-Brown focus:bg-slate-50"/>
          
          <div className="flex gap-1 items-center">
            <input type="checkbox"/>
            <span className="text-sm">Forget Password</span>
          </div>

          <button className="px-10 py-2 text-2xl rounded-md bg-Cream hover:bg-Beige text-Brown">Login</button>
          <p className="text-sm text-center text-Redwood">Don't have an account? <Link to='/Signup' className="text-Brown text-semibold hover:underline">Signup</Link></p>
        </div>

      </div>
    </div>
  
  </section>
  )
}

export default Signin
