import React, { useContext, useEffect, useState } from 'react'
import Chiled from '../Chiled/Chiled';
import { CarConText } from '../../ConText/CartConText';
import image1 from "../../assets/Imgease/image1.jpeg"
import { Link } from 'react-router-dom';

export default function Cart() {
 
 let   {GetLoggedusercart,RemoveSpecificCartItem,ClearCart,Updatecartproductquantity} = useContext(CarConText);
 const [product,setproduct] = useState([]);
 const [count,setCount] = useState(1);
 const [Totalprice,setTotalprice] = useState(0);
 const [cartId,setcartId] = useState(null);//Empaty ;
 //to make uppdata all time

 function GetUserCart()
 {
  GetLoggedusercart().then((res)=>{
    console.log(res);
    setproduct(res.data.data.products);
    setTotalprice(res.data.data.totalCartPrice);
    setcartId(res.data.cartId);
   }).catch((err)=> {
     console.log(err);
   })
 }

 useEffect(()=>{
  GetUserCart();
 },[])

 function CartRemoved(productId)
 {
  RemoveSpecificCartItem(productId).then((res)=>{
    console.log(res);
    setproduct(res.data.data.products);//new array
  }).catch((err)=>{
    console.log(err); 
  })
 }

 function RemoveAllCarts()
 {
  ClearCart().then((res)=>{
    console.log(res);
   setproduct([]);//empty array
  }).catch((err)=>{
    console.log(err);
  })
 }
 
 function UserUppDate(ID,count) {
  
  Updatecartproductquantity(ID,count)
    .then((res) => {
      console.log(res);
      setproduct(res.data.data.products);
      setTotalprice(res.data.data.totalCartPrice);
    })
    .catch((err) => {
      console.log(err);
    });
}

 function StarRating({rating})
 {
   return (
     <div className='flex items-center gap-2'>
      {[1,2,3,4,5]?.map((star)=>(

      <i key={star}
         className= {`fa-solid fa-star 
          
          ${rating >= star ? "text-yellow-600" : "text-gray-400"}
          `} ></i>
      ))
      }
      <span className='text-gray-600 text-sm'>{rating}</span>
     </div>
   )
 }
 
 function StarRating({rating})
 {
   return (
     <div className='flex items-center gap-2'>
      {[1,2,3,4,5]?.map((star)=>(

      <i key={star}
         className= {`fa-solid fa-star 
          
          ${rating >= star ? "text-yellow-600" : "text-gray-400"}
          `} ></i>
      ))
      }
      <span className='text-gray-600 text-sm'>{rating}</span>
     </div>
   )
 }

  return (
  <>
  {product?.length != 0 ?  <section>
    
    <div>
    <header className='mt-14 flex items-center justify-between w-[85%] mx-auto '>
    <h2 className='font-bold text-xl md:text-2xl '>Shopping Cart</h2>
    <button onClick={RemoveAllCarts} className='text-red-700 text-xl md:text-2xl font-bold hover:text-black rounded-2xl duration-200'>Clear All Carts</button>
    </header>
    </div>

   <div className='w-[85%] mx-auto mt-16 my-5 flex max-xl:flex-col gap-5'>
   <div className='flex-col w-3/4  max-xl:w-full'>

  {product.map((item)=>

 <div key={item?.product?._id} className="flex gap-6 mt-5 ">

  <div className='border border-gray-300 p-5 px-40 shadow-md rounded-xl'>
     {/* الصورة */}
  <div className="w-full max-w-[200px] aspect-square h-[100px] ">
    <img
      src={item?.product?.imageCover}
      className="w-full h-full object-contain rounded-xl"
      alt={item?.product?.title}
    />
  </div>

  {/* المحتوى */}
  <div className="flex flex-1 justify-between items-start">

    {/* النص */}
    <div className='flex flex-col'>
       <h2 className="text-2xl font-bold">
       {item?.product?.category?.name}
      </h2> 

        <div className="flex items-center gap-2 mt-2">

         <div className="flex gap-5">
          <StarRating rating = {item?.product?.ratingsAverage}/>
          </div>
            {/* <p className="text-sm text-gray-500 flex">({item.sold})</p> */}
        </div>
        

    </div>
      
    
    {/* العداد + السعر + الحذف */}
    <div className="flex items-center gap-10 mt-7">
      {/* العداد */}
      <div class=" flex items-center">
       <button onClick={()=>UserUppDate(item?.product?._id,item?.count - 1)} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
         <svg class="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
           </button>
              <span className='mx-3'>{item.count}</span>
               <button onClick={()=>UserUppDate(item?.product?._id,item?.count + 1)} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                 <svg class="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/></svg>
                   </button>
                    </div>
      {/* العداد */}
      <div className="text-right">
        <p className="font-semibold">${item?.price}</p>
        <p className="line-through text-gray-500">${item?.price+70}</p>
      </div>

     <button className='text-red-700 hover:text-black duration-300' onClick={()=>CartRemoved(item?.product?._id)}>Remove</button> 

    </div>

   </div>

  </div>
  
 </div>

  )}
    </div>
   
      {/*second section  */}
     <div className='mt-14 max-xl:w-full flex-1'>
      <div className='border border-gray-300 p-5 px-3 md:px-10 lg:px-20 rounded-md shadow-md'>
        <div className='my-2'>
        <h2 className='font-semibold text-2xl'>Order Summary</h2>
       </div>
       <div className='my-2 flex gap-16'>
        <span>Subtotal ({product?.length} iteams)</span>
        <span>${Totalprice}</span>

       </div>
       <div  className='my-2 flex gap-16'>
        <span>Shipping</span>
        <span className='text-green-700'>Free</span>
       </div>
       <div  className='my-2 flex gap-16'>
        <span>Tax</span>
        <span className='text-gray-400'>$70</span>
       </div>
       <div>
        <p className='border'></p>
       </div>
       <div  className='my-2 flex gap-16'>
        <span className='font-bold text-2xl'>Total</span>
        <span className='font-bold text-2xl'>${Totalprice + 70}</span>
       </div>
       <div className='mb-5'>
        <Link to={`/CheckOut/${cartId}`} className='bg-red-700 text-white py-2 px-4 rounded-xl hover:bg-black duration-300'>Proceed to Checkout
        <i className="fa-solid fa-share"></i>
        </Link>
       </div>
       <div className='mb-5'>
        <Link to={"/FeatcharedProducts"} className='bg-yellow-700 text-white py-2 px-4 rounded-xl hover:bg-black duration-300 '> Continue Shopping
         <i className="fa-solid fa-share"></i>
         </Link>
       </div>
       <div>
        <p className='text-gray-500 text-xl'>Secure Checkout</p>
       </div>
       <div >
        <span className='text-gray-600'><i className="fa-solid fa-lock text-yellow-700"></i>
          SSL Encrypted .
        </span>

        <span className='text-gray-600'> <i className="fa-brands fa-cc-visa text-blue-700"></i>Secure Payment</span>
          
       </div>

     </div>

      </div>
       
         {/*End second section*/}

   </div>
   
  </section>  : <section className=" flex items-center justify-center mt-40">
  <div className="flex flex-col items-center gap-4 text-center">
  
    <i class="fa-solid fa-battery-empty text-3xl"></i>

    <h2 className="font-bold text-2xl">
      Your Cart is Empty
    </h2>

    <p className="text-gray-600 max-w-sm">Looks like you havent added any items to your cart yet.Start
     <br />
      shopping to fill it up.
     </p>
    

    <Link to={"/FeatcharedProducts"} className="bg-blue-700 text-white py-2 px-6 rounded-xl mt-2 hover:bg-black duration-300">
      Start shopping
    </Link>

  </div>
</section>
}
 
  </>  
  )
}
