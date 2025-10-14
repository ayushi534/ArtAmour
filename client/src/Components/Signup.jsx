import React from 'react';
import {Link} from"react-router-dom";
import Images from "../assets/Background.jpeg"

const Signup = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center font-sans overflow-hidden ">
      
      <div className="absolute inset-0">
        <img src={Images} alt="Art Background" className="w-full h-full object-cover blur-sm scale-105"
        />
        
        <div className="absolute inset-0 bg-Brown mix-blend-multiply"></div>
      </div>

      <div className="relative bg-amber-50 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md text-center text-Brown ">
        <h1 className="text-3xl font-serif mb-4">Sign Up to ArtAmour</h1>
        <p className="text-sm mb-8 text-Redwood">Create your account to explore!</p>

        <div className="flex flex-col text-left gap-4">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="rounded-md p-2 border-2 outline-none focus:border-Brown"
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            className="rounded-md p-2 border-2 outline-none focus:border-Brown"
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="rounded-md p-2 border-2 outline-none focus:border-Brown"
          />
          <input
            type="password"
            placeholder="Confirm Your Password"
            className="rounded-md p-2 border-2 outline-none focus:border-Brown"
          />

          <button
            type="submit"
            className="w-full bg-Cream text-offcream py-2 rounded-full font-semibold hover:bg-Beige transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-Redwood mt-6">
            Already have an account?{" "}
            <Link to ="/Signin"className="text-Brown font-semibold cursor-pointer hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;


    

