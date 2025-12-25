import React, { useState } from 'react'
import axios from 'axios';
import {Formik, useFormik} from 'formik'
import * as YUP from "yup"
import { Link} from 'react-router-dom';

export default function ForgetPaswored() {
 
 let [erros,seterros]=useState();


 let valedation = YUP.object().shape({
  email:YUP.string().required("email required").email("Enter your Email")
 })

 let formike = useFormik({
     initialValues:{
      email:""
     },
     validationSchema:valedation,
     onSubmit:function(values)
     {
      console.log(values);
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values,{
       
      }).then((res)=>{
        console.log(res);
        console.log(res.data);
        
      }).catch((err)=>{
          console.log(err.response?.data);
      }).finally(()=>{
        seterros("Unable to send email, please try again later")
      })
     }
  })
  

  return (
  <>
    <section className='py-5 mt-8'>
      <header className='text-center'>
       <p className='text-blue-600 text-xl font-bold mb-3'>ShopiFya</p>   
       <h1 className='text-2xl font-bold mb-3'>Forgot Your PassWord?</h1>
       <p className='text-sm text-gray-700'>Enter your email address and we will send you instructions to reset your<br />
        PassWord
       </p>
      </header>
    </section>  
  
    {/* start Form */}
     
  <form onSubmit={formike.handleSubmit} className="max-w-sm mx-auto border shadow-xl  p-4">
   <div className="mb-5">
   <label for="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
   <input value={formike.values.email} onChange={formike.handleChange} onBlur={formike.handleBlur} name="email" type="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs rounded-2xl placeholder:text-body" placeholder="name@flowbite.com"  />
   </div>

   {formike.errors.email && formike.touched.email ? <p className='text-red-700 mb-4'>{formike.errors.email}</p> : null}
   
   <div className='text-center mb-5'>
      <Link to = {"/forVerifyResetCode"} type="submit" className=" bg-blue-700 text-white py-2 px-4 border rounded-xl text-center hover:bg-black duration-200">Send Reset Instructions</Link>
   </div>
   
    <Link to = {"/login"}>
    <div className='text-center text-blue-700 '>
      <i className="fa-solid fa-arrow-left"></i><span>Back To Login</span>
    </div>

    </Link>

   </form>


    {/* End Form */}
  </>  
  )
}








