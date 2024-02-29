"use client"
import { useContext } from 'react';
import {  ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { FaChevronLeft , FaChevronRight} from "react-icons/fa";
import { subCategories } from "@/utils/constants"

import Link  from 'next/link';
import Image from 'next/image';
function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
     
    return (
      <div  style={{ opacity: isFirstItemVisible ? "0" : "1" }} className="w-[45px] 
      h-[45px] rounded-full  lg:flex hidden items-center justify-center bg-[#fff] hover:bg-[#111] hover:text-[#fff] z-40 m-auto">
     <button   
        className="btn-arrow z-40 flex items-center justify-center mx-auto"
        disabled={isFirstItemVisible}
       
        onClick={() => scrollPrev()}
      >
        <FaChevronLeft className="transform translate-y-[-2px]" width={20} height={20} />
      </button>
      </div>
      
    );
  }
function RightArrow() {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
  
    return (
      <div  style={{ opacity: isLastItemVisible ? "0" : "1" }} className="w-[45px] 
       h-[45px] rounded-full  lg:flex hidden items-center justify-center bg-[#fff] hover:bg-[#111] hover:text-[#fff] z-9999 m-auto">
     <button 
        className="btn-arrow z-9999 flex items-center justify-center mx-auto"
        disabled={isLastItemVisible}
       
        onClick={() => scrollNext()}
      >
        <FaChevronRight  className="transform translate-y-[-2px]" width={20} height={20} />
      </button>
      </div>
    );
  }
function SumCategories() {
  return (
    <div className="w-full bg-[#f0f0f0] px-3 lg:py-5 py-3 flex  flex-col my-5">
    <h2 className="text-black font-extrabold text-[27px] text-center pt-3  ">Des <span className='text-[#0aafaa] '>milliers</span> de produits pour répondre à toutes vos envies</h2>
     
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {subCategories.map((item:any, index:number) => (
        <Link key={index}  href={item.url}
        className='space-y-3 mt-3 flex flex-col items-center justify-center text-center mx-3'>
          <div className='lg:w-[180px] lg:h-[180px] w-[130px] h-[130px]  border-[1px] border-[#ddd] flex justify-center items-center rounded-full '>
            <Image
              width={100} height={100}
              className='!w-full  h-full object-contain'
              src={item.img}
              alt={item.title}
              style={{ backgroundColor: 'transparent' }} // Add this line
            />
          </div>
          <p className='lg:text-base !text-[#4c4c4c] text-sm font-medium'>{item.title}</p>
        </Link>
      ))}
    </ScrollMenu>
  </div>
  )
}

export default SumCategories

