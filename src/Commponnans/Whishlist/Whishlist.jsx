import React, { useContext, useEffect, useState } from 'react'
import image1 from "../../assets/Imgease/image1.jpeg"
import { Link, useParams } from 'react-router-dom'
import { WhishContext } from '../../ConText/WhishContext'
import { CarConText } from '../../ConText/CartConText';
import Sppanar from '../Sppanar/Sppanar';

export default function Whishlist() {

 const { Getloggeduserwishlist,Removeproductfromwishlist } = useContext(WhishContext);
 const [products,setproduct] = useState([]);
 let {AddProductToCart} = useContext(CarConText);
 const [isloding,setisloding] = useState(false);
 const [selecteddproduct,setselecteddproduct] = useState(null);

 function AdduserCart(productid)
 {
  setselecteddproduct(productid);
  setisloding(true);
  AddProductToCart(productid).then((res)=>{
  console.log(res);
    setisloding(false)
  }).catch((err)=>{
    console.log(err);
    
  })
 }





 function Removecart(ID)
 {
  Removeproductfromwishlist(ID).then((res)=>{
    console.log(res.data);
  }).catch((err)=>{
    console.log(err);
    
  })
 }

 
 function Showdataofwishlist()
 {
  Getloggeduserwishlist().then((res)=>{
    console.log(res);
    setproduct(res.data.data);
  }).catch((err)=>{
    console.log(err);
  })
 }

 useEffect(()=>{
   Showdataofwishlist()
 },[])

   function StarRating({rating})
   {
     return (

     <div className='flex items-center gap-2'>
     {[1,2,3,4,5].map((star)=>(
      <i 
       className={`fa-solid fa-star
         ${rating >=star ? "text-yellow-500" : "text-gray-400" }`}></i>
     ))
     }
     <span className='font-semibold text-gray-500'>{rating}</span>
     </div>
     )
   }

  return (
  <>
   <section>
    <header>
     <div className='w-[85%] mx-auto mt-10 gap-4'>

      <div className='flex items-center gap-3'>
       <i className="fa-regular fa-heart text-red-600 text-2xl"></i>
       <h1 className='text-2xl font-bold'>My Wishlist</h1>
      </div>
        
        <div className='mt-2 '>
          <p className='text-gray-800'>{products.length} saved iteams</p> 

        </div>
        
     </div>
    </header>

   {/* Start section */}
   
  <div className="w-[85%] mx-auto mt-5">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
   {products.map((item)=>
   <div key={item._id} className="border rounded-2xl p-4 shadow-sm">
      <div className='flex items-center '>
        <button onClick={()=>Removecart(item._id)}>
          <i className= "fa-solid fa-xmark text-red-400 font-bold text-2xl hover:text-red-700" ></i>
        </button>
      </div>
      <div className="w-full aspect-square max-w-[220px] mx-auto">
        <img
          src={item.imageCover}
          className="w-full h-full object-cover rounded-xl"
          alt={item.title}
        />
      </div>

      <div className="mt-4">
        <p className="text-gray-700 text-sm">{item.category.name}</p>
        <h1 className="text-lg font-bold mb-2">{item.title}</h1>
         <StarRating rating ={item.ratingsAverage}/>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg font-bold">$ {item.price}</span>

          <span className="text-sm text-gray-500 line-through">$ {item.price + 70}</span>
          <span className="text-green-700 text-sm">In Stock</span>
        </div>

         <span className="block text-sm text-gray-700 mt-2">
            Added on {new Date(item.createdAt).toLocaleDateString()}
         </span>

      </div>

      <button onClick={()=>AdduserCart(item._id)} className="w-full mt-4 bg-yellow-800 text-white py-2 rounded-xl hover:bg-yellow-950 duration-200 flex items-center justify-center gap-2">{isloding && item._id == selecteddproduct ? <Sppanar></Sppanar> : "Add To Cart" }
      
        <i className="fa-solid fa-cart-arrow-down"></i>
      </button>
    </div>
   
  )}


   

 

 


  




  </div>
  <div className='text-center mt-5'>
    <Link to={"/FeatcharedProducts"} className='text-white bg-blue-700 py-2 px-5 rounded-lg hover:bg-black duration-200'>Continue Shopping</Link>
  </div>
</div>

   







   {/* End section */}





   </section>
  
  
  </>  
  )
}
