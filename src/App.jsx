import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Commponnans/LayOut/LayOut'
import Home from './Commponnans/Home/Home'
import About from './Commponnans/About/About'
import Loggin from './Commponnans/Loggin/Loggin'
import ForgetPaswored from './Commponnans/ForgetPasswored/ForgetPaswored'
import Ordars from './Commponnans/Ordars/Ordars'
import NavBar from './Commponnans/NavBar/NavBar'
import Footer from './Commponnans/Footer/Footer'
import Cart from './Commponnans/Cart/Cart'
import Whishlist from './Commponnans/Whishlist/Whishlist'
import CheckOut from './Commponnans/ChechOut/CheckOut'
import ProductDetailes from './Commponnans/ProductDetalits/ProductDetailes'
import Rejestar from './Commponnans/Regestar/Rejestar'
import FeatcharedProducts from './Commponnans/FeatcharedProducts/FeatcharedProducts'
import NotFound from './Commponnans/NotFound/NotFound'
import ProtectedRoute from './Commponnans/ProtectedRoute/ProtectedRoute'
import TokenContextProvider from './ConText/TokenConrext'
import CarConTextProvider from './ConText/CartConText'
import Whishlistprovider from './ConText/WhishContext'
import ForVerifyResetCode from './Commponnans/ForgetPasswored/VerifyResetCode'
import  {ResetPassword}  from './Commponnans/ForgetPasswored/ResetPassword'


export function App() {
  
  let routing = createBrowserRouter([

  {path:"",element:<LayOut></LayOut>,children:[  
   {index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
   {path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
   {path:"regestar",element:<Rejestar></Rejestar>}, 
   {path:"login",element:<Loggin></Loggin>}, 
   {path:"forgot-password",element:<ForgetPaswored></ForgetPaswored>},
   {path:"forVerifyResetCode",element:<ForVerifyResetCode></ForVerifyResetCode>},
   {path:"ResetPassword",element:<ResetPassword></ResetPassword>},
   {path:"navbar",element:<NavBar></NavBar>},  
   {path:"footer",element:<Footer></Footer>}, 
   {path:"productDetalies/:productid",element:<ProtectedRoute><ProductDetailes></ProductDetailes></ProtectedRoute> },
   {path:"about",element:<ProtectedRoute><About></About></ProtectedRoute> },
   {path:"allorders",element:<ProtectedRoute><Ordars></Ordars></ProtectedRoute>},  
   {path:"cart",element:<ProtectedRoute><Cart></Cart></ProtectedRoute> }, 
   {path:"FeatcharedProducts",element:<ProtectedRoute><FeatcharedProducts></FeatcharedProducts></ProtectedRoute>},  
   {path:"/products/:category",element:<ProtectedRoute><FeatcharedProducts></FeatcharedProducts></ProtectedRoute>},
   {path:"whishlist",element:<ProtectedRoute><Whishlist></Whishlist></ProtectedRoute> },  
   {path:"CheckOut/:cartid",element:<ProtectedRoute><CheckOut></CheckOut></ProtectedRoute> },
   {path:"*",element:<NotFound></NotFound>}
  ]}  
  ])

  return (
    <>
  
       <TokenContextProvider>
        <Whishlistprovider>
         <CarConTextProvider>
           <RouterProvider router={routing}></RouterProvider> 
         </CarConTextProvider> 
        </Whishlistprovider>
       </TokenContextProvider>
        
  

   
    </>
  )
}

export default App
