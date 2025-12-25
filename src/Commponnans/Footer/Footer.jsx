import React from 'react'

export default function Footer() {


  return (<>

 <footer className="bg-[#2b2b2b] text-white pt-4 pb-0 mt-60">

  {/* المحتوى الأساسي */}
  <div className="w-[85%] mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

    {/* 1 — اللوجو + الوصف */}
    <div>
      <h3 className="text-xl font-semibold mb-3">Soccer Universe</h3>
      <p className="text-gray-300 leading-relaxed">
        Bringing you comprehensive coverage of <br />
        the beautiful game from around the world.
      </p>
    </div>

    {/* 2 — Leagues */}
    <div>
      <h3 className="text-xl font-semibold mb-3">Leagues</h3>
      <ul className="space-y-2 text-gray-300">
        <li><a href="" className="hover:text-white duration-200">Premier League</a></li>
        <li><a href="" className="hover:text-white duration-200">La Liga</a></li>
        <li><a href="" className="hover:text-white duration-200">Serie A</a></li>
        <li><a href="" className="hover:text-white duration-200">Bundesliga</a></li>
      </ul>
    </div>

    {/* 3 — Competitions */}
    <div>
      <h3 className="text-xl font-semibold mb-3">Competitions</h3>
      <ul className="space-y-2 text-gray-300">
        <li><a href="" className="hover:text-white duration-200">Champions League</a></li>
        <li><a href="" className="hover:text-white duration-200">Europa League</a></li>
        <li><a href="" className="hover:text-white duration-200">World Cup</a></li>
        <li><a href="" className="hover:text-white duration-200">Euros</a></li>
      </ul>
    </div>

    {/* 4 — Company */}
    <div>
      <h3 className="text-xl font-semibold mb-3">Company</h3>
      <ul className="space-y-2 text-gray-300">
        <li><a href="" className="hover:text-white duration-200">About Us</a></li>
        <li><a href="" className="hover:text-white duration-200">Contact</a></li>
        <li><a href="" className="hover:text-white duration-200">Careers</a></li>
        <li><a href="" className="hover:text-white duration-200">Privacy Policy</a></li>
      </ul>
    </div>

  </div>

  {/* الخط السفلي */}
  <div className="mt-11 bg-[#232323]">
    <p className="py-5 text-center text-gray-300 border-t border-gray-600">
      © 2025 Soccer Universe All rights reserved.
    </p>
  </div>

</footer>

  
  </>     
  )
}



