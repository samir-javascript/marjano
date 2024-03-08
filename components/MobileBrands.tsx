"use client"
import  { useContext } from "react";
import  Link   from "next/link";


import {  ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css';

import { FaChevronLeft , FaChevronRight} from "react-icons/fa";
import { Image } from "react-bootstrap";

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
     
    return (
      <div  style={{ opacity: isFirstItemVisible ? "0" : "1" }} className="w-[45px] h-[45px] rounded-full hidden lg:flex items-center justify-center bg-[#ddd] z-40 m-auto">
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
      <div  style={{ opacity: isLastItemVisible ? "0" : "1" }} className="w-[45px]  h-[45px] rounded-full  hidden lg:flex items-center justify-center bg-[#ddd] z-40 m-auto">
     <button 
        className="btn-arrow z-40 flex items-center justify-center mx-auto"
        disabled={isLastItemVisible}
       
        onClick={() => scrollNext()}
      >
        <FaChevronRight  className="transform translate-y-[-2px]" width={20} height={20} />
      </button>
      </div>
    );
  }
const MobileBrands = ({useBrands}:any) => {
    const brand = useBrands()
  return (
    <div className="max-w-[1400px] mx-auto  mb-5">
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {brand.map((item:any,index:number)=> (
                    <Link href={`/browse-boutique-brand?brandName=${item.url}`} className="rounded-md bg-[#f1f1f1] px-3 py-1 flex items-center justify-center w-[140px] mx-3  h-[70px]   " key={index}>
                        <Image alt={item.url} width={120} height={100} className="object-contain w-[120px] h-full" src={item.src}  />
                    </Link>
                ))}
    </ScrollMenu>
    </div>
  )
}

export default MobileBrands