"use client"
import { FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa'


import AccordionPart from './AccordionPart'
import Link from 'next/link'
import { categories, footerCols2, footercols3 } from '@/utils/constants'


const Footer = () => {
   


 
 //  if(pathname == "/shipping" || pathname =='/payment'  || pathname.startsWith('/order') || pathname == '/place-order' ||  pathname.startsWith('/success') || pathname =='/auth' || pathname == '/register') return null;
   //if(pathname.startsWith('/success')) return null
  return (
    <footer className="w-full lg:flex hidden flex-col ">
        
        <div className="p-[20px] w-full bg-[#0b4d54] ">
            <div className='flex flex-col max-w-[1400px] mx-auto '>
            <p className="font-bold text-white text-[18px] ">Suivez nous</p>
             <div className='flex items-center gap-3 mt-2'>
                 <Link href='https://www.facebook.com' target='_blank' className='w-[45px] h-[45px] border-[2px]
                  border-white flex items-center justify-center rounded-full'>
                    <FaFacebook color='white' />
                 </Link>
                 <Link href='https://www.instagram.com' target='_blank' className='w-[45px] h-[45px] border-[2px]
                  border-white flex items-center justify-center rounded-full'>
                    <FaInstagram color='white' />
                 </Link>
                 <Link href='https://www.youtube.com' target='_blank' className='w-[45px] h-[45px] border-[2px]
                  border-white flex items-center justify-center rounded-full'>
                    <FaYoutube color='white' />
                 </Link>
             </div>
            </div>
            
         </div>
         <div className='p-[20px]  bg-[#1c6c76] text-white border-b border-slate-400 '>
              <div className='w-full flex flex-wrap 
          gap-x-[60px] gap-y-10 max-w-[1400px] mx-auto '>
                    <ul>
                 <h2 className='font-semibold text-[16px] mb-3 capitalize '>categories</h2>
                 {categories.map((item,index)=> (
                    <li key={index}>
                       <Link className='text-sm text-slate-50 font-medium hover:underline' href={item.url}>
                           {item.title}
                       </Link>
                    </li>
                 ))}
             </ul>
             <ul>
                 <h2 className='font-semibold text-[16px] mb-3 capitalize '>Découvrez la Marketplace</h2>
                 {footerCols2.map((item,index)=> (
                    <li key={index}>
                       <Link className='text-sm text-slate-50 font-medium hover:underline' href='/'>
                           {item}
                       </Link>
                    </li>
                 ))}
             </ul>
          <ul className='border-r border-[#ddd] pr-4 h-[50%] '>
              <h2 className='font-semibold text-[16px] mb-3 capitalize '>Informations légales</h2>
              {footercols3.map((item,index)=> (
                    <li key={index}>
                       <Link className='text-sm text-slate-50 font-medium hover:underline' href="#">
                           {item}
                       </Link>
                    </li>
                 ))}
                 <button className='bg-transparent border text-slate-50 text-sm font-bold hover:underline
                  capitalize h-[35px] rounded-[20px] border-white outline-none w-full mt-4 '>
                     devenir vendeur
                 </button>
          </ul>
             
            <AccordionPart />
              </div>
           
         </div>
         <div className='w-full p-[20px] bg-[#1c6c76] text-white '>
            <div className='max-w-[1400px] mx-auto '>
            <p className='text-[12px] font-bold text-slate-100 '>© 2024 - marjanemall - Tous droits réservés.</p>
            </div>
            
         </div>
       
        
    </footer>
  )
}

export default Footer