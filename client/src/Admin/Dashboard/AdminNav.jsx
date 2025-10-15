import React from 'react'
import {Search, Menu ,ChevronDown, Filter} from 'lucide-react'

const AdminNav = ({toggleSidebar, filter, setfilter}) => {
  return (
   <nav className='bg-Brown px-4 py-3 flex justify-between ml-64'>
     <div className='flex items-center text-xl'>
        <span className='text-white font-semibold'>ArtAmour</span> 
     </div>
     <div className='flex items-center gap-x-5'>
      <div className='relative md:w-65'>
        <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
          <button className='p-1 focus:outline-none text-white md:text-black'><Search/></button></span>
        <input type='text'placeholder='Search' className='w-full text-sm px-4 py-1 pl-12 rounded shadow outline-none hidden md:block'/>
      </div>

     </div>
   </nav>
  )
}

export default AdminNav



