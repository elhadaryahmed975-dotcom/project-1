import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import image1 from "../../assets/Imgease/image1.jpeg"
import { Link } from 'react-router-dom';

export default function Ordars() {

 const[lastorders,setlastorders] = useState({});
 const [delate,setdelate] = useState({});

 const token = localStorage.getItem("userToken");
 const {id} = jwtDecode(token)
 console.log(id);
  
 function getUserOrders()
 {
   axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
   .then((res)=>{
    console.log(res);
    const value = res.data.length - 1;//get laste orders
    setlastorders(res.data[value]);
  }).catch((err)=>{
    console.log(err);
    
  })
 }

 useEffect(()=>{
  getUserOrders()
 },[])
 
 function StarRating({rating})
 {
  return(
   <div className='flex items-center gap-1'>
   {[1,2,3,4,5].map((star)=>(
    <i key={star}
     className = {` fa-solid fa-star
       ${rating >= star ? "text-yellow-400" : "text-slate-300"} 
     `}  ></i>
   ))
   }
   <span className='text-gray-700 text-sm'>{rating}</span>
   </div>
  )
 }
 


  return (
  <>
  <section>
   <div className='w-[85%] mx-auto'>

   <header className='mt-7'>
    <h1 className='font-bold text-2xl mb-4'>My Ordars</h1>
    <p className='text-gray-500 mb-4'>Track and manage your order histort</p>
   </header>





<div className='border p-10 rounded-xl shadow-md mb-3'>
   <div className='flex items-center justify-between'>
    
    {/* العنوان */}
    <h2 className='text-xl font-semibold'>
      Order #ORD  {lastorders.id}
    </h2>

    {/* السعر و عدد المنتجات */}
    <div className='flex items-center gap-2 pr-2'>
      <span className='font-semibold'>${lastorders.totalOrderPrice}</span>
      <span className='text-gray-500'>({lastorders?.cartItems?.length} iteams )</span>

    </div>

   </div>
   {lastorders?.cartItems?.map((item)=>
    <>
     <div className='border-b text-gray-500 mt-10'></div>
    
   <div key={item?._id} className='w-full mt-3 flex items-center gap-6 border p-4 rounded-lg'>
  
    {/* الصورة */}
    <div className='flex-shrink-0'>
     <img
      src={item.product.imageCover}

      className='w-[100px] rounded-2xl object-contain'
      alt={item.product.title}

      />
     </div>

  {/* الاسم + الكمية */}
    <div className='flex flex-col gap-1 flex-grow'>
     <p className='font-bold text-lg'>
      {item.product.category.name}
      </p>
      <span className='text-gray-500 text-sm'>
      Quantity: {item.count} * $ {item.price}

     </span>
       < StarRating rating={item.product.ratingsAverage} />
     <div>
      <div>
       {/* star rating */}
    <div>
   </div>
  </div>

     </div>
      {/* stars */}
    </div>

    {/* السعر + Remove */}
   <div className='flex items-center gap-4 ml-auto'>
     <span className='font-semibold text-lg'>
      $ {item.count * item.price}

     </span>

    <button
      className='text-red-500 text-sm hover:text-black'
      onClick={() => removeItem(item.product.id)}

    >
      Remove
    </button>
   </div>

  </div>
    </>
   
  
  )}
   
   
      
 

   {/* Images */}
</div>

  

      <div className='mt-7 flex justify-center items-center'>
         <Link to={"/FeatcharedProducts"} className='bg-blue-600 text-white py-2 px-4 hover:bg-black duration-200 rounded-2xl'>Continue Shopping</Link>
      </div>

   </div>
  


    
  </section>
 

  </>
  )
}
