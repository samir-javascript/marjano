"use client"
import { useContext, useState } from "react";

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css';
import './styles.css';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Link from "next/link";
import { useCategoryNames } from "@/utils/constants";
import { Image } from "react-bootstrap";

interface Props {
  name: string;
  image: string;
  id: string;
  imageBanner: string;
}

function LeftArrow({ isMouseOverMenu }: { isMouseOverMenu: boolean }) {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext)
  const isHidden = isFirstItemVisible || !isMouseOverMenu;

  return (
    <div style={{ opacity: isHidden ? "0" : "1" }} className="w-[45px] h-[45px] rounded-full hidden lg:flex items-center justify-center bg-[#ddd] z-40 m-auto">
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

function RightArrow({ isMouseOverMenu }: { isMouseOverMenu: boolean }) {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
  const isHidden = isLastItemVisible || !isMouseOverMenu;

  return (
    <div style={{ opacity: isHidden ? "0" : "1" }} className="w-[45px] h-[45px] rounded-full hidden lg:flex items-center justify-center bg-[#ddd] z-40 m-auto">
      <button
        className="btn-arrow z-40 flex items-center justify-center mx-auto"
        disabled={isLastItemVisible}
        onClick={() => scrollNext()}
      >
        <FaChevronRight className="transform translate-y-[-2px]" width={20} height={20} />
      </button>
    </div>
  );
}

const CategorySlider = () => {
  const categories = useCategoryNames()
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOverMenu(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOverMenu(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} className='category-slider-wrapper max-w-[1400px] mx-auto z-[99] mt-[-120px] '>
      <ScrollMenu LeftArrow={() => <LeftArrow isMouseOverMenu={isMouseOverMenu} />} RightArrow={() => <RightArrow isMouseOverMenu={isMouseOverMenu} />}>
        {categories.map((item: Props) => (
          <Link
            key={item.id}
            href={`/browse-products?categoryName=${item.name}`}
            className={`cate-slider`}
          >
            <div className='cate-paragraph'>
              <p className="whitespace-nowrap font-extrabold text-sm ">{item.name}</p>
            </div>
            <div className='cate-slider-img relative'>
              <Image fluid src={item.image} alt={item.name} />
            </div>
          </Link>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default CategorySlider;
