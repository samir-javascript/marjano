"use client"
import { CgChevronDown } from 'react-icons/cg';

import Link from 'next/link'
import { FormEvent, useEffect } from 'react';
import { categories, footerCols2, footercols3 } from '@/utils/constants';

function FooterAccordion() {
 
  useEffect(() => {
    const accordion = document.getElementsByClassName('contentbx');

    const handleClick = (event:any) => {
      const target = event.currentTarget;
      target.classList.toggle('active');
    };

    for (let i = 0; i < accordion.length; i++) {
      accordion[i].addEventListener('click', handleClick);
    }

    return () => {
      for (let i = 0; i < accordion.length; i++) {
        accordion[i].removeEventListener('click', handleClick);
      }
    };
  }, []);


  return (
      <div  className='accordion'>
           <div  className="contentbx relative ">
              <div  className='text-white p-[10px] border-b
               border-slate-50 relative cursor-pointer flex items-center justify-between label '>
                  <p>Categories</p>
                  <CgChevronDown color='white' size={30} />
              </div>
              <div className="content 
               text-white relative ">
                    <ul className='!p-0'>
                {categories.map((item,index)=> (
                    <li key={index} className='mb-1'>
                       <Link className='text-sm text-slate-50 p-0 m-0 font-medium hover:underline' href={item.url}>
                           {item.title}
                       </Link>
                    </li>
                 ))}
                </ul>
              </div>
           </div>
           <div  className="contentbx relative  ">
              <div className='text-white p-[10px] border-b border-slate-50
               relative cursor-pointer label flex items-center justify-between'>
                 <p>Découvrez la Marketplace</p>
                 <CgChevronDown color='white' size={30} />
               </div>
              <div className="content  
               text-white relative ">
                    <ul className='!p-0'>
                {footerCols2.map((item,index)=> (
                    <li key={index} className='mb-1'>
                       <Link className='text-sm text-slate-50 font-medium hover:underline' href={"/"}>
                           {item}
                       </Link>
                    </li>
                 ))}
                </ul>
              </div>
           </div>
           <div  className="contentbx relative  ">
              <div  className='text-white p-[10px] border-b
               border-slate-50 relative cursor-pointer label flex items-center justify-between '>
                   <p>Informations légales</p>
                   <CgChevronDown color='white' size={30} />
                </div>
              <div className="content 
                text-white  relative">
                <ul className='!p-0'>
                {footercols3.map((item,index)=> (
                    <li key={index} className='mb-1'>
                       <Link className='text-sm text-slate-50 font-medium hover:underline' href={"/"}>
                           {item}
                       </Link>
                    </li>
                 ))}
                </ul>
                 
              </div>
           </div>
      </div>
  );
}

export default FooterAccordion;

