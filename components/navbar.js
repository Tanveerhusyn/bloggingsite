import React from "react";
import { Disclosure } from "@headlessui/react";
import Container from "@components/container";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/img/Loom-blogs.svg";
import LogoWhite from "../public/img/logo-white.svg";
import { myLoader } from "@utils/all";

export default function Navbar() {
  const [isOpen , setIsOpen] = React.useState(true)
  const leftmenu = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Contact",
      href: "/contact"
    }
  ];

  const rightmenu = [
    {
      label: "Archive",
      href: "/archive"
    },
    {
      label: "Github",
      href: "https://github.com/web3templates/stablo",
      external: true
    },
    {
      label: "Download",
      href: "https://web3templates.com/templates/stablo-minimal-blog-template",
      external: true
    }
  ];

  const mobilemenu = [...leftmenu, ...rightmenu];

  return (
    <nav x-data="{ isOpen: false }" className="fixed w-full z-10 mb-5 bg-white shadow dark:bg-gray-800">
    <div className="container px-6 py-3 mx-auto md:flex">
        <div className="flex items-center justify-between">
            <a href="#">
                <Image src="/img/mainlogo2.png" alt="logo" width={190} height={40}   loader={() => 0}
    unoptimized={true} style={{width:'180px',height:'auto'}} className="w-full h-10 sm:h-7" />
            </a>

          
            <div className="flex lg:hidden">
                <button x-cloak  type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                   {
                    !isOpen?(
                      <svg  onClick={()=>setIsOpen(true)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                    ):(
<svg onClick={()=>setIsOpen(false)} x-show="isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    )
                   }
            
                    
                </button>
            </div>
        </div>

        
        <div   className={`absolute ${isOpen?"block":"hidden"} inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between`}>
            <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
               {
                leftmenu.map((item,idx)=>(
                  <a key={idx} href={item.href} className="px-2.5 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 md:mx-2">{item.label}</a>

                ))
               }
                          </div>

            <div className="relative mt-4 md:mt-0">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>

                <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search"/>
            </div>
        </div>
    </div>
</nav>
  )
}
