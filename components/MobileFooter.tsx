"use client"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import AccordionPart from "./AccordionPart"
import React from "react"
import FooterAccordion from "./Accordion"
import { usePathname } from "next/navigation"


const MobileFooter = () => {
  const pathname = usePathname()
   if(pathname === "/shipping" || pathname === "/user-shipping" || pathname === '/payment'  || pathname.startsWith('/orders') || pathname == '/place-order' ||  pathname.startsWith('/success')  || pathname.startsWith("/admin")) return null;
 // if(pathname.startsWith('/success')) return null
  return (
    <footer className='bg-[#1c6c76] p-2 pt-4 flex lg:hidden flex-col w-full '>
       <FooterAccordion />
       <button className='bg-transparent border text-slate-50 text-[20px] font-extrabold hover:underline
                  capitalize h-[50px] rounded-[20px] border-white outline-none w-[90%] mx-auto mt-8 '>
                     devenir vendeur
                 </button>
                <AccordionPart /> 
                <div className="py-3 mt-2 px-2 flex  items-center justify-between">
                <p className='text-[12px] font-bold text-slate-100 '>© 2024 - marjanemall</p>
                <div className='flex items-center gap-3 mr-2'>
                 <Link href='https://www.facebook.com' target='_blank' className='w-[45px] h-[45px] border-[2px]
                  border-white flex items-center justify-center rounded-full'>
                    <FaFacebook width={25} height={25} color='white' />
                 </Link>
                 <Link href='https://www.instagram.com' target='_blank' className='w-[45px] h-[45px] border-[2px]
                  border-white flex items-center justify-center rounded-full'>
                    <FaInstagram  width={25} height={25} color='white' />
                 </Link>
                 <Link href='https://www.youtube.com' target='_blank' className='w-[45px] h-[45px] border-[2px]
                  border-white flex items-center justify-center rounded-full'>
                    <FaYoutube  width={25} height={25} color='white' />
                 </Link>
             </div>
                </div>
    </footer>
  )
}

export default MobileFooter