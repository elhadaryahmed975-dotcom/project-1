import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CarConText } from '../../ConText/CartConText';
import Sppanar from '../Sppanar/Sppanar';
import { WhishContext } from '../../ConText/WhishContext';

export default function ProductDetailes() {

 const[isloading,setisloading] = useState(false);
 let [selacteddproduct,setselacteddproduct] = useState(null);

 let {AddProductToCart,Updatecartproductquantity} = useContext(CarConText);
 let {productid} = useParams();
 console.log(productid);
 let[product,setproduct] = useState([]);//{}
 let[relatedproduct,setrelatedproduct] = useState([]);
 const [count,setCount] = useState(1);
 const [productss,setproductss] = useState([]);//Empty Array
 const [Totalprice,setTotalprice] = useState(0);
 const {Addproducttowishlist} = useContext(WhishContext);

 function AddProductUser(product)
 {
  Addproducttowishlist(product).then((res)=>{
    console.log(res);
     
  }).catch((err)=>{
    console.log(err);
   

  })
 }

 function AddToCart(ID)
 {
  setselacteddproduct(ID);
  setisloading(true);
  AddProductToCart(ID).then((res)=>{
  console.log(res);
  setisloading(false);
 }).catch((err)=>{
  console.log(err);
 })
 }
//map > Array only
 function Getproduct(id)//return only one object
 {
   axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   .then(({data})=>{
    console.log(data.data);
    setproduct(data.data);
   }).catch((err)=>{
     console.log(err);
   })
 }
  function GetAllproducts()
  {
    axios.get("https://ecommerce.routemisr.com/api/v1/products")
    .then(({data})=>{
     console.log( data.data );
     let allproducts = data.data;
     let feiltared = allproducts.filter((iteam)=>iteam?.category?.name == product?.category?.name);
     setrelatedproduct(feiltared);
      // فلتره المنتج 
     let fill = feiltared.filter((iteam)=> iteam?._id !== product?._id);
      // فلتره المنتج 
     setrelatedproduct(fill);

     console.log(allproducts,"allproducts");
     console.log(feiltared,"feiltared");
    }).catch((err)=>{
      console.log(err);
    })
  }

 useEffect(() => {
  Getproduct(productid) ;
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [productid]);

  useEffect(()=>{

   GetAllproducts();   
     
  },[product])

 function StarRating({rating})
 {
   return (
     <div className='flex items-center gap-2'>
     {[1,2,3,4,5].map((star)=>(

      <i  key={star}
       className = {`fa-solid fa-star 
        ${rating >= star ? "text-yellow-400" : "text-gray-500" }
        `}
         ></i>
     ))
     }
     <span className='text-gray-700 text-sm'>{rating}</span>
     </div>
   )
 }
 
 
  return (
  <>
 <section className="max-w-screen-lg mx-auto mt-14">

  <div className='hover:text-blue-700 duration-300'>
   <Link to= {"/FeatcharedProducts"}>
    Back <i class="fa-solid fa-square-arrow-up-right"></i>
   </Link>
  </div>

  <div className="flex flex-col md:flex-row gap-8 items-start">

    {/* الصورة */}
    <div className="w-full md:w-[300px]  md:h-[300px] mx-auto aspect-[4/3] flex-shrink-0">

       <img
        src={product?.imageCover}
        alt={product?.title}
        className=" object-contain rounded-lg"
      />
   
    </div>

    {/* المحتوى */}
    <div className="flex flex-col gap-3">

      <p className="text-sm text-gray-500">
       {product?.title}
      </p>

      <h1 className="font-bold text-2xl text-gray-800">
        {product?.category?.name}
      </h1>

      {/* التقييم */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400 gap-1">
         <StarRating rating ={product?.ratingsAverage} />
        </div>

        <span className="flex text-sm text-gray-600">
         <span>({product?.sold})</span> 
        </span>
      </div>

      {/* السعر */}
      <div className="flex items-center gap-4">
        <p className="text-xl font-bold">${product?.price}</p>
        <p className="text-gray-500 line-through">${product?.price + 100}</p>
      </div>

      {/* الوصف */}
      <p className="text-gray-600 text-sm leading-relaxed">
       {product.description?.split(" ")?.slice(0,15)?.join(" ")}
      </p>

      {/* الحالة */}
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-check text-green-700" />
        <span className="text-green-700 font-medium">
          In Stock
        </span>
      </div>
      <div className='flex flex-col '>
     <div className="flex items-center gap-4 mt-6">

    {/* العداد */}
  <div>
    
  </div>
 <div className="flex items-center border rounded-lg overflow-hidden">
  <button
    onClick={() => count > 1 && setCount(count - 1)}
    className="px-3 py-2 text-lg hover:bg-gray-100"
  >
    -
  </button>

  <span className="px-4 py-2 font-medium">
    {count}
  </span>

  <button
    onClick={() => setCount(count + 1)}
    className="px-3 py-2 text-lg hover:bg-gray-100"
  >
    +
  </button>
</div>


   {/* زرار Add to Cart */}
   <button
   onClick={() => AddToCart(product._id)}
   className="flex-1 bg-yellow-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-900 duration-300"
>  {isloading && product._id == selacteddproduct ?<Sppanar></Sppanar>:"Add to Cart"}
   <i className="fa-solid fa-cart-shopping"></i>
   </button>


   {/* القلب */}
   <button onClick={()=>AddProductUser(product._id)} className="w-12 h-12 flex items-center justify-center rounded-lg border hover:bg-red-600 text-black duration-300">
   <i className="fa-regular fa-heart text-xl"></i>
   </button>

  </div>

    </div>
    {/* last section */}
      <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-3 text-center'>

       <div className='flex gap-5'>
     <i className="fa-solid fa-truck text-blue-500 hover:text-black duration-300"></i>
      <span className='text-gray-500 text-sm'>Free Shipping</span>
     </div>

     <div className='flex gap-5'>
      <i className="fa-solid fa-shield-halved text-green-600 hover:text-black duration-300"></i>
      <span className='text-gray-500 text-sm'>2 Years Warranty</span>
     </div>

     <div className='flex gap-5'>
      <i className="fa-solid fa-retweet text-orange-400 hover:text-black duration-300"></i>
      <span className='text-gray-500 text-sm'>30 Day Retuns</span>
     </div>

     </div>
         {/* last section */}
    </div>
  </div>
   {/* Realated Products */}
    <div className='w-[85%] mx-auto mt-20'>
     <header>
      <span className='font-bold text-xl sm:text-2xl xl:text-3xl hover:text-red-950'>Related Product</span>
     </header>
    </div>
     {/*  */}
    <div>
       <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-12'>
      
      
          {relatedproduct?.map((iteam)=>
            <div key={iteam?._id} className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      
            <Link to={`/productDetalies/${iteam?._id}`}>
            
               <div className='border rounded-lg'>
      
              <div className="relative">
              <img src={iteam?.imageCover} alt={iteam?.title} className="w-full h-[200px] aspect-[4/3] object-contain" />
              <button /////////Make Like Not button
                  onClick={(e)=>{e.preventDefault();
                                 e.stopPropagation();
                     AddProductUser(iteam._id)}}
                className="absolute top-3 right-3 bg-white  p-2 rounded-full shadow-md hover:bg-blue-700 duration-200"
              >
                <i className="fa-regular fa-heart text-red-500 text-lg hover:text-white"></i>
              </button>
            </div>
      
            {/* نصوص المنتج */}
            <div className="p-4 flex flex-col gap-2">
      
              <p className='text-gray-500 text-sm'>{iteam?.category?.name}</p>
    
              <h2 className='text-gray-800 font-semibold text-lg'>{iteam?.category?.slug}</h2>
      
              <p className='text-gray-600 text-sm'>
                {iteam?.description?.split(" ")?.slice(0,2)?.join(" ")}
              </p>
      
              {/* التقييم */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1">
                  <StarRating rating ={iteam?.ratingsAverage} />
                </div>
                <p className="text-sm text-gray-500">({iteam?.sold})</p>
              </div>
      
              {/* السعر */}
              <div className="flex items-center gap-3 mt-2">
                <p className="font-bold text-lg"> $ {iteam?.price}</p>
                <p className="line-through text-gray-400"> $ {iteam?.price + 100}</p>
                <p className="text-green-700 text-sm">In Stock</p>
              </div>
      
             
            </div>
         </div>
            </Link>
               <button onClick={()=>{AddToCart(iteam._id)}} className="bg-yellow-700 text-white w-full rounded-lg mt-3 py-2 flex items-center justify-center gap-2 hover:bg-yellow-900 transition duration-200">{isloading && iteam._id == selacteddproduct?<Sppanar></Sppanar>:"Add To Cart"}
          
                <i className="fa-solid fa-cart-shopping"></i>
               </button>
        </div>
          )}
        </div>
      
    </div>
   {/*  */}


  {/* Realated Products */}
 </section>

  
  
  
  
  </> 
  )
}
