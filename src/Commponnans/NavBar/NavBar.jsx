import React, { useContext, useState } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom'
import  { TokenContext }  from '../../ConText/TokenConrext';

export default function NavBar() {
 
  let {token,settoken} = useContext(TokenContext);
    
  function hundellogeout()
  {
   localStorage.removeItem("userToken");
   settoken(null);
   Navigate("/login")
  }

  return (
  <>

   
   <nav className='bg-white py-4 border shadow-2xl rounded-lg'>
   
      <div className='flex justify-between items-center w-[85%] mx-auto'>

    <div className="flex text-center gap-8">
       <a href="#Shopifya" className='text-2xl text-blue-600 font-bold hover:text-black duration-200'>Shopifya</a>
      {token != null ?  <ul className='flex items-center gap-7'>

     <li>
     <NavLink to={"/"} className={" hover:text-red-700 duration-200"}>Home</NavLink>   
    </li>

    <li>
        <NavLink to={"/cart"}  className={" hover:text-red-700 duration-200"}>Cart</NavLink>
     </li>

      <li>
      <NavLink to={"/whishlist"}  className={" hover:text-red-700 duration-200"}>Wishlist</NavLink>   
      </li>

      <li>
       <NavLink to={"/FeatcharedProducts"} className={" hover:text-red-700 duration-200"}>FeatcharedProducts</NavLink>
      </li>

      </ul>
      : null }
    
     </div> 
     {token != null ?  <div className='flex gap-5'>
       
          <Link to={"/whishlist"}><i className="fa-regular fa-heart  text-3xl hover:text-red-700 duration-200"></i></Link>  
          <Link to={"/cart"}><i className="fa-solid fa-cart-shopping text-3xl  hover:text-red-700 duration-200"></i></Link>  
          <Link to={"/login"} onClick={hundellogeout} className='bg-blue-700 text-white border rounded-2xl py-1 px-5 hover:bg-black duration-200'>Loge Out</Link>
       </div>
   :     <Link to={"/login"} className='bg-blue-700 text-white border rounded-2xl py-1 px-5 hover:bg-black duration-200'>Sigen IN</Link>
   } 
    
   </div>

   

   </nav>

 
 


  </> 
  )
}








