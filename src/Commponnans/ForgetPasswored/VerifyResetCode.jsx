import React from 'react'
import axios from 'axios';
import {Formik, useFormik} from 'formik'
import * as YUP from "yup"
import { Link } from 'react-router-dom';


export default function ForVerifyResetCode()
{
 
 let yupp = YUP.object().shape({
  resetCode:YUP.string().required("Enter Code")
  .matches(/^\d{6}$/, "Code must be exactly 6 digits")
 })
 
 let formike = useFormik({
  initialValues:{
   resetCode:"",
 },
  validationSchema:yupp,
  onSubmit:function(values)
 {
   console.log(values);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values,{

    }).then((res)=>{
        console.log(res);
        
    }).catch((err)=>{
        console.log(err);
        
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
  

  <form onSubmit={formike.handleSubmit} className="max-w-sm mx-auto border shadow-xl p-4">

  <div className="mb-5">
    <label htmlFor="resetCode" className="block mb-2 text-sm font-medium">
     Send Code
    </label>

    <input onChange={formike.handleChange} onBlur={formike.handleBlur} id="resetCode" name="resetCode"  type="text"
      className="w-full border px-3 py-2 rounded-2xl"
      placeholder="Enter code"

    />
  </div>
     {formike.errors.resetCode && formike.touched.resetCode ? <p className='text-red-700 mb-4'>{formike.errors.resetCode}</p> : null}

   <div className="text-center mb-5">
    <Link to={"/ResetPassword"} type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-xl hover:bg-black duration-200">
      Send Code
    </Link >
  </div>

  

 </form>
   
 </>
 
)
}


 