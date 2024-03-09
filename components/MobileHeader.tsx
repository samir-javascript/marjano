 'use client'
import { FaRegHeart, FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import Input from "./Input";
import  Link  from 'next/link'
import { NavDrawerStyles } from "./Drawer/styles";
import {  Drawer } from '@mui/material'
import SideBar from "./SideBarComponent/SideBar";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navtoggle = () => {
   console.log('I WAS CLICKED')

const menu = document.getElementById('menu-cart');

menu?.classList.toggle('show-menu');
document.body.classList.add('stop-scrolling');
console.log('I WAS CLICKED AGAIN')
// Add click event listener to the body

};
const MobileHeader = ({result, qty, user}:any) => {
   const pathname = usePathname()
  
  
     const [mobileOpen,setMobileOpen] = useState(false)
     if(pathname === '/shipping' || pathname === '/payment') return null;
  return (
    <header className="lg:hidden  flex flex-col  bg-[#0b4d54] !text-white pt-2 px-2 !overflow-hidden ">
        <div className="flex items-center justify-between">
             <div className="flex items-center space-x-2">
                 <IoMenu onClick={()=> setMobileOpen(true)}   size={40} color='white' cursor='pointer' />
                 <Link href='/' className="w-[180px] mr-2"> 
                      <Image priority  className="w-full object-contain"  src="https://www.marjanemall.ma/static/version1706188772/frontend/Marjane/default/fr_FR/images/marjane-logo.svg"  title="" alt="MARJANEMALL MAROC" width="218" height="36" />
                 </Link>
             </div>
             <div  className="flex items-center space-x-3">
             <Link href={`/profile/${user.user.clerkId}`} className="relative !text-white">
                   <FaUser size={24} />
                   {user && (
                      <div className="absolute top-[-10px] right-[-10px] bg-yellow-500
                       rounded-full w-[20px] h-[20px] flex justify-center items-center">
                          <span className="text-[10px] text-blue-900 font-extrabold">{result} </span>
                      </div>
                   )}
                </Link>
                <Link className="!text-white" href='/browse-wishlist_products'>
                   <FaRegHeart className="w-[25px] h-[25px] object-contain  " />
                </Link>
                <div onClick={navtoggle} id='cartSlide-btn' className="relative !text-white mr-0.5">
                   <MdOutlineShoppingCart size={26} />
                  {qty !== 0 && (
                    <div className="absolute top-[-10px] flex items-center justify-center rounded-full right-[-10px]  text-[12px] bg-yellow-500 w-[20px] h-[20px] ">
                     <span className="text-[#0b4d54] font-semibold">
                        {qty}
                     </span>

                        </div>
                  )}
                  
                </div>
                 
             </div>
        </div>
        <div className="my-2">
          <Input />
        </div>
        
        <div>
             <NavDrawerStyles>
               
                      <Drawer
                        open={mobileOpen}
                        onClose={()=> setMobileOpen(prev => !prev)}
                        anchor='left'
                        variant="temporary"
                       
                        ModalProps={{keepMounted:true}}
                        classes={{ paper: 'MuiDrawer-paper' }}
                      >
                          <SideBar setMobileOpen={setMobileOpen} />
                      </Drawer>
               
              
             </NavDrawerStyles>
         </div>
    </header>
  )
}

export default MobileHeader