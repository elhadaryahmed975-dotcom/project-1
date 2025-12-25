import React from 'react'
import image1 from "../../assets/Imgease/image1.jpeg"
import image2 from "../../assets/Imgease/image2.jpeg"
import image3 from "../../assets/Imgease/image3.jpeg"
import image4 from "../../assets/Imgease/image4.jpeg"
import { Link } from 'react-router-dom'


export default function Home() {
  return (
  <>
  <section className="min-h-screen bg-blue-600 flex items-center">
  <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-center gap-10">

    {/* Text */}
    <div className="flex flex-col text-center lg:text-left">
      <h1 className="font-bold text-3xl md:text-4xl text-white">
        Discover Amazing
      </h1>

      <p className="text-yellow-500 font-bold text-3xl md:text-4xl mb-4">
        Products
      </p>

      <p className="mb-6 text-white/90 text-sm md:text-base">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
        <Link
          to="/FeatcharedProducts"
          className="text-white border rounded-lg py-2 px-6 bg-orange-700 hover:bg-black duration-200"
        >
          Shop Now
        </Link>

        <button className="text-white border rounded-lg py-2 px-6 bg-orange-700 hover:bg-black duration-200">
          View Electronics
        </button>
      </div>
    </div>

    {/* Images */}
    <div className="grid grid-cols-2 gap-4">
      {[image1, image2, image3, image4].map((img, i) => (
        <div
          key={i}
          className="w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px]"
        >
          <img
            src={img}
            className="w-full h-full object-cover rounded-xl shadow-2xl"
            alt=""
          />
        </div>
      ))}
    </div>

  </div>
</section>


 <div className="w-[90%] mx-auto mt-16">

  <div className="text-center mb-12">
    <h1 className="font-bold text-2xl md:text-3xl">
      Why Choose Shopifya?
    </h1>
    <p className="text-gray-600 text-sm md:text-base">
      We are committed to providing you with the best shopping experience
    </p>
  </div>

  <div className="flex flex-col md:flex-row justify-between items-center gap-10">

    {[
      { icon: "fa-car", title: "Free Shipping", desc: "Orders over $50" },
      { icon: "fa-helmet-safety", title: "Secure Payment", desc: "100% secure payment" },
      { icon: "fa-headphones", title: "24/7 Support", desc: "Always here to help" },
    ].map((item, i) => (
      <div key={i} className="flex flex-col items-center text-center gap-3">
        <i className={`fa-solid ${item.icon} text-blue-700 text-3xl`} />
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-gray-700 text-sm">{item.desc}</p>
      </div>
    ))}

  </div>
</div>


  </> 
  )
}

