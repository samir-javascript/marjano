"use client"
import { CiLock } from "react-icons/ci";
import Link from 'next/link'
import CheckoutSteps from "./CheckoutSteps";
import { usePathname } from "next/navigation";
import Image from 'next/image'
import React from "react";
const CheckoutHeader = () => {
  const  pathname  = usePathname();

  return (
    <header className="bg-[#0b4d54] border-b border-gray-400 w-full h-[80px]">
      <nav className="flex items-center justify-between max-w-[1600px] mx-auto h-full px-2">
        <Link href='/'>
          <Image  className=" sm:w-[230px] w-[150px] cursor-pointer object-contain" src="https://www.marjanemall.ma/static/version1706188772/frontend/Marjane/default/fr_FR/images/marjane-logo.svg" title="" alt="" width="218" height="36" />
        </Link>
        <div className="lg:flex hidden">
          {/* Conditionally render step3 prop based on pathname */}
          {pathname !== '/success' && (
             pathname === "/shipping" && <CheckoutSteps step1 step2 />
           
          )}
          {pathname !== '/success' && (
           
             pathname === "/payment" && <CheckoutSteps step1 step2 step3 />
          )}
          {pathname !== '/success' && (
           
           pathname.startsWith('/order') && <CheckoutSteps step1 step2 step3 step4 />
        )}
         
          
        </div>
        <div className="flex items-center gap-2">
          <p className="font-bold  sm:text-[22px] text-white text-[18px] whitespace-nowrap">Secure checkout</p>
          <CiLock color='white' size={35} />
        </div>
      </nav>
    </header>
  );
};

export default CheckoutHeader;
