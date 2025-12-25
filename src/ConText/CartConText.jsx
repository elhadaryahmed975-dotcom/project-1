import { createContext } from "react"
import axios from "axios";

export let  CarConText = createContext();

export default function CarConTextProvider({children})
{
  function AddProductToCart(ID,count)
  {
  return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
    productId:ID,
    count
   },{
    headers:{
        token:localStorage.getItem("userToken"),
    }
   }).then((res)=>{
    return res;
   })
    .catch((err)=>{
        return err;
    })
  }
 function GetLoggedusercart()
 {
   return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
    headers:{
      token:localStorage.getItem("userToken"),
    }
  }).then((res)=>{
    return res;

  })
   .catch((err)=>{
    return err;
  })
 }

 function RemoveSpecificCartItem(IDD)
{
 return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${IDD}`,{
  headers:{
    token:localStorage.getItem("userToken"),
  }
  }).then((res)=>{
   return res;
  }).catch((err)=>{
  return err;
  })
}

 function ClearCart()
 {
 return axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
  headers:{
    token:localStorage.getItem("userToken"),
  }
 }).then((res)=>{
  return (res);
  
 }).catch((err)=>{
   return (err);
 })
 }

 function Updatecartproductquantity(ID,PCOUNT)
 {
 return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ID}`,{
    count:PCOUNT
  },{
    headers:{
      token:localStorage.getItem("userToken"),
    }
  }).then((res)=>{
    return (res);
    
  }).catch((err)=>{
     return (err);
    
  })
 }

  return <CarConText.Provider value = { { AddProductToCart,GetLoggedusercart,RemoveSpecificCartItem,ClearCart,Updatecartproductquantity} }>
    {children}
  </CarConText.Provider>

}






