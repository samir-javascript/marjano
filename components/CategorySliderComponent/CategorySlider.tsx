"use client"
import  { useContext } from "react";
import { useCategoryNames} from '@/utils/constants'
import {   ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css';
import './styles.css';
import { FaChevronLeft , FaChevronRight} from "react-icons/fa";
import { Image } from "react-bootstrap";
import Link from "next/link";
interface Props {
   name: string;
   image: string;
   id: string;
   imageBanner: string;
}
function LeftArrow() {
    const {isFirstItemVisible, scrollPrev} = useContext(VisibilityContext)
     
    return (
      <div  style={{ opacity: isFirstItemVisible ? "0" : "1" }} className="w-[45px] h-[45px]
       rounded-full hidden lg:flex items-center justify-center bg-[#ddd] z-40 m-auto">
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
      <div  style={{ opacity: isLastItemVisible ? "0" : "1" }} className="w-[45px]  h-[45px] rounded-full 
       hidden lg:flex items-center justify-center bg-[#ddd] z-40 m-auto">
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
const CategorySlider = () => {
 // const { pathname } = useLocation();

  const categories = useCategoryNames()
 // if (pathname !== '/' && !pathname.includes('/page/')) return null;
 
  return (
    <div className='category-slider-wrapper max-w-[1400px] mx-auto z-[99] mt-[-120px] '>
      <ScrollMenu  LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {categories.map((item:Props) => (
          <Link 
            key={item.id}
            
            href={`/browse-products?categoryName=${item.name}`}
            className={`cate-slider`}
          >
           
           <div className='cate-paragraph'>
              <p className="whitespace-nowrap font-extrabold text-sm ">{item.name}</p>
          </div>
            <div className='cate-slider-img'>
              <Image fluid loading="lazy" src={item.image} alt={item.name} />
            </div>
           
          
          </Link>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default CategorySlider;

