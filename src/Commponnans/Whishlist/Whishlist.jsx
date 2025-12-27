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
    setproduct((oldproduct)=>oldproduct.filter(item=>item._id !==ID))
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
  {products != 0 ?  <section>
    <header>
     <div className='max-w-screen-lg mx-auto mt-10 gap-4'>

      <div className='flex items-center gap-3'>
       <i className="fa-regular fa-heart text-red-600 text-xl md:text-2xl lg:text-3xl"></i>
       <h1 className='text-xl md:text-2xl lg:text-3xl font-bold mb-2'>My Wishlist</h1>
      </div>
        
        <div className='mt-2 text-xl md:text-2xl lg:text-3xl'>
          <p className='text-gray-800'>{products.length} saved iteams</p> 

        </div>
        
     </div>
    </header>

   {/* Start section */}
   
  <div className="w-[85%] mx-auto mt-5">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 lg:gap-7">
      
   {products.map((item)=>
   <div key={item._id} className="border rounded-2xl p-4 md:p-6 max-w-[400px] shadow-sm">
      <div className='flex items-center'>
        <button onClick={()=>Removecart(item._id)}>
          <i className= "fa-solid fa-xmark text-red-400 font-bold text-2xl hover:text-red-700" ></i>
        </button>
      </div>
      <div className="w-full aspect-square max-w-[220px] mx-auto">
        <img
          src={item.imageCover}
          className="w-full h-full object-contain rounded-xl"
          alt={item.title}
        />
      </div>

      <div className="mt-4">
        <p className="text-gray-700 text-sm">{item.category.name}</p>
        <h1 className="text-lg font-bold mb-2 truncate">{item.title}</h1>
         <StarRating rating ={item.ratingsAverage}/>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-lg  font-bold">$ {item.price}</span>

          <span className="text-sm text-gray-500 line-through">$ {item.price + 70}</span>
          <span className="text-green-700 text-sm">In Stock</span>
        </div>

         <span className="block text-sm text-gray-700 mt-2">
            Added on {new Date(item.createdAt).toLocaleDateString()}
         </span>

      </div>

      <button onClick={()=>AdduserCart(item._id)} className="w-full mt-4 bg-yellow-800 text-white py-2 rounded-xl hover:bg-yellow-950 duration-200 flex items-center justify-center gap-2 ">{isloding && item._id == selecteddproduct ? <Sppanar></Sppanar> : "Add To Cart" }
      
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





   </section> : 
   
   
   <section className='flex flex-col justify-between items-center gap-4 mt-36'>
   <i className='fa-regular fa-heart text-xl md:text-5xl text-gray-700'></i>
   <h1 className='font-bold text-xl md:text-2xl'>Your Wishlist is Empty</h1>
   <span className='text-center'>save products you love for later by clicking the heart icon on <br/>
                           any product
   </span>
   <Link to={"/FeatcharedProducts"} className='py-1 px-3 md:py-3 md:px-5 bg-blue-700 rounded-xl hover:bg-black duration-200 text-white'>Discover Products</Link>

   </section>
    
    
    
    

    }
  </>  
  )
}
