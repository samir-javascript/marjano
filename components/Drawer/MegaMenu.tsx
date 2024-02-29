"use client"
import { useState } from "react"
import {  Drawer, } from '@mui/material'
import { IoMenu } from "react-icons/io5";
import SideBar from "../SideBarComponent/SideBar";
import { NavDrawerStyles } from "./styles";

const MegaMenu = () => {
    const [mobileOpen,setMobileOpen] = useState(false)
   
  return (
    <div className="w-full ">
         <div className="max-w-[1400px] mx-auto">
         <div className="w-full border-b border-[#ddd] ">
            <div className={`${mobileOpen ? 'w-[300px] ' : "w-[250px]"} lg:flex hidden transition-width 
          duration-300 items-center px-2 py-1.5 cursor-pointer bg-[#00afaa] `}
           onClick={()=> setMobileOpen(true)}>
            <IoMenu size={35} className="pr-1" color="#fff" />
               <p className="whitespace-nowrap text-[17px] text-white font-bold">Toutes les categories</p>
            </div>
              
          </div>
         <div>
          {/* a new with width set to 240px  */}
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
         </div>
    </div>
  )
}

export default MegaMenu