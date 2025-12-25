import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as YUP from "yup"
import Sppanar from '../Sppanar/Sppanar'
import  {TokenContext}  from '../../ConText/TokenConrext'

export default function Loggin() {
  
let {token,settoken} = useContext(TokenContext)

let  navegate =  useNavigate();

let [isloading,setisloading] = useState(false);

function handelLogin(values)
{
    setisloading(true);
    console.log(values);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then((res)=>{
    console.log(res);
    localStorage.setItem("userToken",res.data.token);
    settoken(res.data.token);
    setisloading(false);   
    navegate("/")

    }).catch((err)=>{
      console.log(err);
    })
}

let validation = YUP.object().shape({

email:YUP.string().required("email is Required").email("Email Is Invalied"),
password:YUP.string().required("password is Required").matches(/[A-Z][a-z 0-9]{7,}/,"password is Invalid"),

})

let formike = useFormik({//make form very good

  initialValues:{
    email:"",
    password:"",
  },
  validationSchema:validation,
   onSubmit:handelLogin
})

  return (<>

  <section className='py-5 mt-3'>
  <header className="text-center mb-5 flex flex-col space-y-2">
  <p className="font-bold text-xl text-blue-500">Shopifya</p>
  <h1 className="font-bold text-2xl">Sign In To Your Account</h1>
  <p>
    Or <Link to={"/regestar"} className="text-blue-600">Create a New ACCount</Link>
  </p>
 </header>
  </section>

 <form onSubmit={formike.handleSubmit} class="max-w-sm mx-auto mt-5 border shadow-lg rounded-lg px-6 py-5 ">

   <div class="mb-5">
    <label for="IDemail"  class="block mb-2.5 text-sm font-medium text-heading">Your Email</label>
    <input  onChange={formike.handleChange} onBlur={formike.handleBlur} type="email" name="email" id="IDemail" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body rounded-3xl" placeholder="Enter Your Email"  />
   </div>
   {formike.errors.email && formike.touched.email ? <p className='text-red-700 mb-3'>{formike.errors.email}</p>:null}
   
   <div class="mb-5">
    <label for="IDpassword" class="block mb-2.5 text-sm font-medium text-heading">Password</label>
    <input  onChange={formike.handleChange} onBlur={formike.handleBlur} type="password" name="password" id="IDpassword" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body rounded-3xl" placeholder="Enter Your Password "  />
   </div>
   {formike.errors.password && formike.touched.password ?<p className='text-red-700 mb-3'>{formike.errors.password}</p> :null}
  
   {/* Forgot password? */}
   <div className="flex justify-end mb-4">
  <Link
    to="/forgot-password"
    className="text-sm text-blue-600 hover:text-black duration-200"
  >
    Forgot password?
   </Link>
   </div>
   {/*  {/* Forgot password? */}
   <div className='justifut-center items-center text-center'>
    <button type="submit" class="bg-blue-700 text-white rounded-xl py-[12px] px-[48px] hover:bg-black duration-200">{isloading?<Sppanar></Sppanar>:"Login"}</button>
   </div>

   {/* the buttonds */}

   </form>

  </> 
  )
}
