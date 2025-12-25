import axios from 'axios';
import {Formik, useFormik} from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as YUP from "yup"
import Sppanar from '../Sppanar/Sppanar';
import { TokenContext } from '../../ConText/TokenConrext';

export default function Rejestar() {

let {token,settoken} = useContext(TokenContext);

let  nalinke =  useNavigate();

let [isloading,setisloading] = useState(false);

function handelregestar(values)
{   
    setisloading(true);
    console.log(values);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then((res)=>{
      console.log(res);
      localStorage.setItem("userToken",res.data.token);
      settoken(res.data.token);
      setisloading(false);
      nalinke("/")

    }).catch((err)=>{
      console.log(err);
    })
}

let validation = YUP.object().shape({

name:YUP.string().required("Name is Required").min(3,"Name Must Be At Least 3").max(20,"Name is Invalide"),
email:YUP.string().required("email is Required").email("Email Is Invalied"),
password:YUP.string().required("password is Required").matches(/[A-Z][a-z 0-9]{7,}/),
rePassword:YUP.string().required("rePassword is Required").oneOf([YUP.ref("password")],"rePassword Must be Equal Password"),
phone:YUP.string().required("Phone is Required"),

})

let formike = useFormik({//make form very good

  initialValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  },
  validationSchema:validation,
   onSubmit:handelregestar
})
  return (
  <>
   <section className='py-10'>

   <header className='mx-auto text-center'>

    <p className='text-blue-600 font-semibold text-2xl mb-3'>Shopifya</p>
    <h2 className='font-semibold text-3xl mb-3'> Create Your Account </h2>
    <p> Or <Link to={"/login"} className='text-blue-600 font-semibold mb-3'>Sign in to your existing account</Link></p>
    
   </header>

   {/* start the Form  */}
  
   <form onSubmit={formike.handleSubmit} class="max-w-sm mx-auto mt-11 border shadow-lg rounded-lg px-6 py-5 ">

   <div class="mb-5">
    <label for="IDName"  class="block mb-2.5 text-sm font-medium text-heading">Name</label>
    <input onChange={formike.handleChange} onBlur={formike.handleBlur} type="text" name="name" id="IDName" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body rounded-3xl" placeholder="Enter Your Name"  />
   </div>
   {formike.errors.name && formike.touched.name ? <p className='text-red-700 mb-3'>{formike.errors.name}</p>:null}
   
   
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
   

   <div class="mb-5">
    <label for="IDrepassword"  class="block mb-2.5 text-sm font-medium text-heading">repassword</label>
    <input  onChange={formike.handleChange} onBlur={formike.handleBlur} type="password" name="rePassword" id="IDrepassword" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body rounded-3xl" placeholder="Enter Your repassword "  />
   </div>
   {formike.errors.rePassword && formike.touched.rePassword ? <p className='text-red-700 mb-3'>{formike.errors.rePassword}</p> :null}
   

   <div class="mb-5">
    <label for="IDphone"  class="block mb-2.5 text-sm font-medium text-heading">phone Number</label>
    <input  onChange={formike.handleChange} onBlur={formike.handleBlur} type="phone" name="phone" id="IDphone" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body rounded-3xl" placeholder="Enter Your phone Number"  />
   </div>
   {formike.errors.phone && formike.touched.phone ? <p className='text-red-700 mb-3'>{formike.errors.phone}</p> :null}

   {/* the buttonds */}
   <label for="remember" class="flex items-center mb-5">
    <input  onChange={formike.handleChange} onBlur={formike.handleBlur} id="remember" name="checkbox" type="checkbox"  class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"  />
    <p class="ms-2 text-sm font-medium text-heading select-none">I agree with the <a href="#" class="text-fg-brand hover:underline"><span className='text-blue-600'>terms and conditions</span></a>.</p>
   </label>

   <div className='justifut-center items-center text-center'>
    <button  type="submit" class="bg-blue-700 text-white rounded-xl py-[12px] px-[48px]   hover:bg-black duration-200">{isloading?<Sppanar></Sppanar>:"Create Account"}</button>
   </div>

   {/* the buttonds */}

   </form>
   { /* End the Form  */ }
   </section>


  </>  
  )
}
