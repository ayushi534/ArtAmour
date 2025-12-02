import React,{useState} from 'react';

const Navigation = () => {
  const [openType, setOpenType] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  

  return (
    <nav className='bg-yellow-50 text-Brown font-sans shadow-md '>
        <div className='container mx-auto flex items-center justify-center space-x-8 py-4'>

            <a href='#' className='hover:text-Redwood font-medium transition-colors'>All Art</a>

            <div className='relative'
              onMouseEnter={() => setOpenCategory(true)}
              onMouseLeave={() => setOpenCategory(false)}>
              <button  className='hover:text-Redwood font-medium transition-colors'>Art Categories ▼ </button>
                {openCategory && (
              <ul className='absolute left-0 mt-2 bg-Beige text-Brown rounded-lg shadow-lg w-80 z-50'>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Decorative Arts</li>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Traditional Arts</li>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Handcrafted Creations</li>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Potrait</li>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Modern Art</li>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Pichwai Art</li>
              </ul>
                )}

            </div>

            <div className='relative'
              onMouseEnter={() => setOpenType(true)}
              onMouseLeave={() => setOpenType(false)}>
              <button className='hover:text-Redwood font-medium transition-colors'>Art Types ▼</button>
                {openType && (
              <ul className='absolute left-0 mt-2 bg-Beige text-Brown rounded-lg shadow-lg w-80 z-50'>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Medium & Surface</li>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Shapes</li>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Types</li>
                <li className='px-4 py-2 hover:bg-yellow-50 cursor-pointer'>Size</li>    
              </ul>
                )}
            </div>
        </div>
    </nav>
  )
}

export default Navigation;
