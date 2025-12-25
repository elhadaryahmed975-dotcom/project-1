import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (<>
  
 <section className="flex flex-col justify-center items-center mt-32">
  <header className="text-center">

    <div className="flex flex-col items-center gap-5">
      <i className="fa-solid fa-circle-user text-5xl text-gray-700"></i>

      <h1 className="text-2xl font-bold">
        That Page Can’t Be Found
      </h1>

      <p className="text-gray-600">
        Lorem ipsum, dolor sit amet consectetur adipisicing.
      </p>

      <Link 
        to={"/"} 
        className="bg-blue-700 text-white py-2 px-4 border rounded-xl hover:bg-blue-800 duration-200"
      >
        Go To Home
      </Link>
    </div>

  </header>
</section>

  
  
  </> 
  )
}
