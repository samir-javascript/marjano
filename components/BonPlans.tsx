"use client"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ProductCard from "./ProductCard";
import Image from 'next/image';




const BonPlans = ({bonPlansProducts, user}:any) => {
  const parsedProducts = JSON.parse(bonPlansProducts)
  const parsedUser = JSON.parse(user)
  const settings = {
    dots: false,
    infinite: true,
    
    speed: 500,
    slidesToShow: 5, // You can adjust the number of slides to show at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: false, 
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: false, 
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false, 
        },
      },
    ],
  };

  return (
    <div className="  pb-4 pt-1.5 relative ">
      {/* Background with a lower z-index */}
      <div className="bg-carousel z-[-1] w-full absolute inset-0"></div>
      <div className='max-w-[1400px] sm:mx-auto mx-[30px] flex items-center gap-x-1 mt-5 px-3'>
        <Image width={30} height={20}  src={"/images/icon_new-year.png"} alt='star icon'  />
      <h2 className="text-[#fff] font-extrabold text-[30px]  px-2 z-1">Bons  <span className='animate-pulse text-[#d5c483] '>plans</span></h2>
      </div>
    
      <div className='z-1 max-w-[1400px] mx-auto '>
        <Slider {...settings}>
          {parsedProducts.products.map((item:any) => (
            <div key={item._id} className="flex gap-4 mx-[30px] z-10  mt-3 lg:items-start justify-center items-center lg:justify-start">
              <ProductCard  product={JSON.stringify(item)} user={JSON.stringify(parsedUser)} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BonPlans;
