import React from 'react';
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-Beige'>
      <div className='flex flex-col items-center'>
        <h1 className='font-bold text-5xl text-Brown lg:text-6xl'>404</h1>
        <h6 className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
          <span className='text-red-600'>Oops!</span> 
        </h6>
        <p className="mb-4 text-center text-Redwood md:text-lg">
          The page you're looking for doesn't exist.
        </p>

        {/* Go Home Button */}
        <Link to="/" className='text-Redwood px-9 py-2 rounded-md bg-DarkCream hover:bg-Cream'>
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default Pagenotfound;

