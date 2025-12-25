import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function CheckOut() {

 let {cartid} = useParams();
 const [paymentmethod,setpaymentmethod] = useState("cath");

 let Formik = useFormik({
  initialValues:{
   shippingAddress:{
   details:"",
   phone:"",
   city:""
  }
  },
  onSubmit:CreateCashOrde
 })

 function CreateCashOrde(values){ 
  console.log(values);

   if(paymentmethod == "Cash")
    {
     axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`,values,{
     headers:{
      token:localStorage.getItem("userToken"),
    }
  }).then((res)=>{
   console.log(res);
  
  }).catch((err)=>{
   console.log(err);
  })
   }
  else
  {
   (paymentmethod == "Online")   
   {
     axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`,values,{
      headers:{
        token:localStorage.getItem("userToken"),
      }
     }).then((res)=>{
      console.log(res);
      window.open(res.data.session.url)

     }).catch((err)=>{
      console.log(err);
      
     })
   }
  }





 }
  return (
    <>
   <section>

    <div className='w-[85%] mx-auto mt-7'>
    <header>
    <h1 className='text-2xl font-bold'>CheckOut</h1>
    </header>
   <div className='mt-7 p-5 border rounded-lg shadow-lg'>

  {/* العنوان */}
   <div className='flex items-center gap-3 mb-6'>
    <i className="fa-solid fa-location-dot text-xl text-blue-600"></i>
    <h2 className='text-xl font-semibold'>Shipping information</h2>
   </div>

  {/* الفورم */}
  <form onSubmit={Formik.handleSubmit}>
    <div className='grid grid-cols-1 md:grid-cols-2  gap-6'>

      <div>
        <label htmlFor="fname">First Name</label>
        <input type="text" id="fname" className="w-full border rounded-md p-2" />
      </div>

      <div>
        <label htmlFor="NLast">Last Name</label>
        <input type="text" id="NLast" className="w-full border rounded-md p-2" />
      </div>

      <div>
        <label htmlFor="IDCity">City</label>
        <input onChange={Formik.handleChange} name="city" type="text" id="IDCity" className="w-full border rounded-md p-2" />
      </div>

      <div>
        <label htmlFor="IDnumber">Phone Number</label>
        <input onChange={Formik.handleChange} name="phone" type="number" id="IDnumber" className="w-full border rounded-md p-2" />
      </div>

      <div>
        <label htmlFor="IDAddress">Address</label>
        <input type="text" id="IDAddress" className="w-full border rounded-md p-2" />
      </div>

      <div>
        <label htmlFor="IDDetails">Details</label>
        <textarea onChange={Formik.handleChange} name="details" type="text" id="IDDetails" className="w-full border rounded-md p-2" />
      </div>

    </div>

     {/* Payment methode */}
     <div className='flex flex-col gap-2'>
     <div>
      <h2 className='text-xl font-semibold'>Payment Methods</h2>
      </div>
     
      <div>
       <input onChange={()=>setpaymentmethod("Cash")} value={"Cash"} type ="radio" name="Paymentmethode" id="Cash" className='mr-2'/>
       <label htmlFor="Cash">Cash on delivery</label>
      </div>

      <div>
       <input onChange={()=>setpaymentmethod("Online")} value={"Online"} type="radio" name="Paymentmethode"  id="Online" className='mr-2'/>
       <label htmlFor="Online" >Online payment</label>
      </div>
     
     </div>

   <div className='mt-7'>
     <button type="submit" className='bg-blue-700 text-white w-full rounded-2xl hover:bg-black duration-300'>$$(Place Order)$$</button>
   </div>
     {/* Payment methode */}
  </form>
</div>  

    </div>
   </section>
    </>
  )
}
