import React from 'react'
import axios from 'axios';
import {useFormik} from 'formik'
import * as YUP from "yup"
import { Link } from 'react-router-dom';


export function ResetPassword()
{

 let ypp = YUP.object().shape({
        email:YUP.string().required("Email required").email("Enter New Email"),
        newPassword:YUP.string().required("Enter newPassword").min(6,"Password must be at least 6 characters")
    })
 
 let formik = useFormik({
    initialValues:{
      email:"",
      newPassword:""
    },
    validationSchema:ypp,
    onSubmit:function(values)
    {
     console.log(values);
     axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
     .then((res)=>{
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
     
   
     <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto border shadow-xl p-4">
   
     <div className="mb-5">
       <label htmlFor="email" className="block mb-2 text-sm font-medium">
        Send email
       </label>
   
       <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" name="email"  type="email"
         className="w-full border px-3 py-2 rounded-2xl"
         placeholder="Enter email"
   
       />
     </div>
        {formik.errors.email && formik.touched.email ? <p className='text-red-700 mb-4'>{formik.errors.email}</p> : null}
   
      
     <div className="mb-5">
       <label htmlFor="resetCode" className="block mb-2 text-sm font-medium">
        Send newPassword
       </label>
   
       <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="newPassword" name="newPassword"  type="text"
         className="w-full border px-3 py-2 rounded-2xl"
         placeholder="Enter newPassword"
   
       />
     </div>
        {formik.errors.newPassword && formik.touched.newPassword ? <p className='text-red-700 mb-4'>{formik.errors.newPassword}</p> : null}


      <div className="text-center mb-5">
       <Link to={"/login"} type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-xl hover:bg-black duration-200">
         Send Code
       </Link>
     </div>
   
    
   
    </form>

   </>
  )
}



