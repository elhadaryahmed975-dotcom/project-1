import axios from "axios";
import { createContext, useState } from "react";

export let WhishContext = createContext();

 
export default function Whishlistprovider({children})
{

 const [whshlist,setwhshlist] = useState([]);

 function Addproducttowishlist(productId) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
       { productId },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then((res) => {
      setwhshlist(res.data.data); // 👈 تحديث القائمة
      return res;
    })
    .catch((err) => err);
  }

  function Getloggeduserwishlist()
  {
   return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
    headers:{
        token:localStorage.getItem("userToken"),
    }
   }).then((res)=>{
      setwhshlist(res.data.data);
       return res;
   })
    .catch((err)=>{
        return err;
    })
  }

  function Removeproductfromwishlist(ID)
  {
   return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ID}`,{
        headers:{
            token:localStorage.getItem("userToken"),
        }
    }).then((res)=>{
        return res;

    }).catch((err)=>{
        return err;
    })
  }
 
  
  return <WhishContext.Provider value = {{Addproducttowishlist,Getloggeduserwishlist,Removeproductfromwishlist}} >
     {children}
  </WhishContext.Provider>


}