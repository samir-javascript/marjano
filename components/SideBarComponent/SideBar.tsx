'use client'
import { useEffect } from 'react'
import { List, Divider, ListItem,   ListItemText, ListItemIcon } from '@mui/material'
import { brandsSideBar, categoriesSideBar } from '../../utils/constants'


import {  NavDropdown } from 'react-bootstrap'
import { IoIosLogOut } from "react-icons/io";
import { LinkStyles } from './styles';

import { BiCategory } from "react-icons/bi";
import { FaRegHeart } from 'react-icons/fa'



import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

const SideBar = ({setMobileOpen}:any) => {
  
   const router = useRouter()
  
  const  pathname  = usePathname()
  const userInfo = true;
// && userInfo.isAdmin
  useEffect(() => {
    {/* each time route changes i want you to close the drawer */}
    setMobileOpen(false)
   
  }, [pathname,setMobileOpen])
 
  return (
    <>
       <List className='mt-0  pt-0'>
         <ListItem className='w-full bg-[#f1f1f1] mb-3 lg:!hidden !block'>
         {userInfo && (
            <div className="flex flex-col items-center">
            <Image width={35} height={35} className="w-[35px] h-[35px] object-contain cursor-pointer" 
            src="/images/admin.png" alt="" />
         <NavDropdown className="border-none outline-none !text-white" title={'Admin'}>
          
            <button type="button" onClick={()=> router.push('/admin/ordersList')} className="w-full text-left">
              <NavDropdown.Item>Orders List</NavDropdown.Item>
            </button>
            <button className="w-full text-left" type="button" onClick={()=> router.push('/admin/usersList')}>
              <NavDropdown.Item>Users List</NavDropdown.Item>
            </button>
            <button className="w-full text-left" type="button" onClick={()=> router.push('/admin/productsList')}>
              <NavDropdown.Item>Products List</NavDropdown.Item>
            </button>
          </NavDropdown>
         </div>
          )}
         
         </ListItem> 
           <ListItem className='bg-[#f1f1f1] mb-3 '>
                 <ListItemIcon>
                    <BiCategory />
                 </ListItemIcon>
                 <ListItemText  className='text-[#4c4c4c] text-[16px] font-medium  '
                   primary={"Nos categories"}/> 
             </ListItem>
       {categoriesSideBar.map(item => (
          <LinkStyles href={item.url} key={item.name}>
             <ListItem className='hover:bg-[#f1f1f1] '>
                 <ListItemIcon>
                    <Image width={30} height={30} loading='lazy' className='w-[30px] h-[30px] object-contain '
                     src={item.icon} alt={item.name}  />
                 </ListItemIcon>
                 <ListItemText  className='text-[#4c4c4c] text-[16px] font-medium  '  primary={item.name}/> 
             </ListItem>
             <Divider />
          </LinkStyles>
      ))}
       </List>
      
       <List>
       <ListItem className='bg-[#f1f1f1] my-3 '>
                 <ListItemIcon>
                    <Image width={30} height={30} alt='' loading='lazy' className='w-[30px] h-[30px] object-contain ' 
                    src="/images/marque.png" />
                 </ListItemIcon>
                 <ListItemText  className='text-[#4c4c4c] text-[16px] font-medium  '  primary={"marques"}/> 
        </ListItem>
        {brandsSideBar.map(item => (
         <LinkStyles href={item.url} key={item.name}>
             <ListItem className='hover:bg-[#f1f1f1] '>
                 <ListItemIcon>
                    <Image loading='lazy' className='w-[30px] h-[30px] object-contain ' 
                    src={item.icon} alt={item.name} width={30} height={30} />
                 </ListItemIcon>
                 <ListItemText  className='text-[#4c4c4c] text-[16px] font-medium  '  primary={item.name}/> 
             </ListItem>
             <Divider />
          </LinkStyles>
        ))}
       </List>
       <LinkStyles href='/sales/history'>
       <ListItem  className=' mt-3 hover:bg-[#f1f1f1] '>
                 <ListItemIcon>
                    <Image width={30} height={30} alt='' loading='lazy'
                     className='w-[30px] h-[30px] object-contain ' src="/images/command.png" />
                 </ListItemIcon>
                 <ListItemText  className='text-[#4c4c4c] text-[16px] font-medium  ' 
                  primary={"Mes Commandes"}/> 
        </ListItem>
       </LinkStyles>
      
        <Divider className='!text-gray-500 ' />
        <LinkStyles href='/profile'>
        <ListItem className='hover:bg-[#f1f1f1] '>
                 <ListItemIcon>
                    <Image width={30} height={30}  alt='' loading='lazy' 
                    className='w-[30px] h-[30px] object-contain ' src="/images/map.png" />
                 </ListItemIcon>
                 <ListItemText  className='text-[#4c4c4c] text-[16px] font-medium  '  primary={"Mes Addresses"}/> 
        </ListItem>
       
        </LinkStyles>
        <LinkStyles href='/browse-wishlist_products'>
        <ListItem className='hover:bg-[#f1f1f1] mb-3 '>
                 <ListItemIcon>
                    <FaRegHeart className='w-[30px] h-[30px] object-contain ' />
                 </ListItemIcon>
                 <ListItemText  className='text-[#4c4c4c] text-[16px] font-medium  '  primary={"Mes Favouris"}/> 
        </ListItem>
        </LinkStyles>  
        {userInfo && (
 <ListItem   className='hover:bg-[#f1f1f1] cursor-pointer mb-3 '>
 <ListItemIcon>
    <IoIosLogOut  className='w-[30px] h-[30px] object-contain ' />
 </ListItemIcon>
 <ListItemText  className='text-[#4c4c4c] text-[16px] font-medium  '  primary={"Deconnexion"}/> 
</ListItem>
        )}
       
    </>
  )
}

export default SideBar