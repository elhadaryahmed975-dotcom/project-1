import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import ProductDetailes from '../ProductDetalits/ProductDetailes';
import { CarConText } from '../../ConText/CartConText';
import Sppanar from '../Sppanar/Sppanar';
import Whishlist from '../Whishlist/Whishlist';
import { WhishContext } from '../../ConText/WhishContext';


export default function FeatcharedProducts() {

  
 const[isloding,setisloading] = useState(false);
 let[selecteddproduct,setselecteddproduct] = useState(null);
 let[products,setproducts] = useState([]);//Array function
 let {AddProductToCart} = useContext(CarConText);
 let {Addproducttowishlist} = useContext(WhishContext);

 function Addwishlist(product)
 {
  Addproducttowishlist(product).then((res)=>{
    console.log(res);
    
  }).catch((err)=>{
    console.log(err);    
  })
 }

 function AddToCart(productId)
 {
   setselecteddproduct(productId);
   setisloading(true);
   AddProductToCart(productId).then((res)=>{
    console.log(res);
   setisloading(false); 
  }).catch((err)=>{
    console.log(err);
  })
 }
 function GetProducts()
 {
   axios.get("https://ecommerce.routemisr.com/api/v1/products")
   .then(({data})=>{
    console.log(data);
    setproducts(data.data);
  }).catch((err)=>{
    console.log(err);
  })
 }
 useEffect(()=>{

 GetProducts()

 },[])

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
  <section className='w-[85%] mx-auto'>

  {/* عنوان القسم */}
  <header>
    <div className='flex flex-col text-center gap-3 mt-6'>
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>Featured Products</h1>
      <p className='text-gray-800'>Discover Our handpicked selection of premium products</p>
    </div>
  </header>
  {/* قائمة المنتجات */}
  <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-12'>
  
    {products.map((iteam)=>
      <div key={iteam._id} className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">

      <Link to={`/productDetalies/${iteam._id}`}>
      
         <div className='border rounded-lg'>

        <div className="relative">
        <img src={iteam?.imageCover} alt={iteam?.title} className="w-full h-[200px] object-contain" />
        <button /////////Make Like Not button
          onClick={(e)=>{e.preventDefault();
            Addwishlist(iteam._id)}}
          className="absolute top-3 right-3 bg-white  p-2 rounded-full shadow-md hover:bg-blue-700 duration-200"
        >
          <i className="fa-regular fa-heart text-red-500 text-lg hover:text-white"></i>
        </button>
      </div>

      {/* نصوص المنتج */}
      <div className="p-4 flex flex-col gap-2">

        <p className='text-gray-500 text-sm'>{iteam.category.name}</p>

        <h2 className='text-gray-800 font-semibold text-lg'>{iteam?.category?.slug}</h2>

        <p className='text-gray-600 text-sm'>
          {iteam.description.split(" ").slice(0,2).join(" ")}
        </p>

        {/* التقييم */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-1">
           <StarRating rating = {iteam.ratingsAverage}/>
          </div>
          <p className="text-sm text-gray-500">({iteam.sold})</p>
        </div>

        {/* السعر */}
        <div className="flex items-center gap-3 mt-2">
          <p className="font-bold text-lg"> $ {iteam.price}</p>
          <p className="line-through text-gray-400"> $ {iteam.price + 70}</p>
        
        </div>

       
      </div>
   </div>
      </Link>
         <button onClick={()=>AddToCart(iteam._id)}  className="bg-yellow-700 text-white w-full rounded-lg mt-3 py-2 flex items-center justify-center gap-2 hover:bg-yellow-950 transition duration-200"> {isloding && iteam._id == selecteddproduct ? <Sppanar></Sppanar> : "Add To Cart"}
          <i className="fa-solid fa-cart-shopping"></i>
         </button>
  </div>
    )}
  </div>

   
</section>

  
  </>
  )
}
