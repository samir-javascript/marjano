"use client"
import  { useEffect, useState } from 'react'

import {  useParams } from 'next/navigation'
import { Carousel } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

const Banner = () => {
  const {keyword} = useParams()

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event:any) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);



 
 

  if(keyword) return null;
  
  return (
    <div className='max-w-[1400px] mx-auto relative'>
      <div className='absolute bottom-0 w-full h-[210px] max-md:h-[130px] z-20  bg' />

    <Carousel   pause='hover' className='mb-4'>
          <Carousel.Item>
               <Link href='/browse-products/Electroménager'>
               <Image
              width={1000}
              height={100}
              className='z-[-1] w-full h-auto'
              src={
                isMobile
                  ? 'https://www.marjanemall.ma/media/wysiwyg/HOME_page_new/CHa-GO_MOB.webp'
                  : 'https://www.marjanemall.ma/media/wysiwyg/HOME_page_new/CHa-GO_DT.webp'
              }
              alt='Electroménager'
              onError={(e) => {
                console.error('Image failed to load:', e);
              }}
            />
               
               </Link>
            </Carousel.Item>
            
            <Carousel.Item>
               <Link href='/browse-products/Maison%20-%20Cuisine%20-%20Deco'>
                  <Image width={1000} height={100}   className='z-[-1] w-full h-auto'
                   src={isMobile ?
                    'https://www.marjanemall.ma/media/wysiwyg/Mois-du-blanc/slider-mobile-linge-maison.webp' :
                     "https://www.marjanemall.ma/media/wysiwyg/Mois-du-blanc/slider-linge-maison-desktop.webp" }
                       alt={"Maison%20-%20Cuisine%20-%20Deco sur MARJANEMALL MAROC"} />
               
               </Link>
            </Carousel.Item>
           
           

            

            <Carousel.Item>
               <Link href='/browse-products/Beauté - Santé'>
                  <Image onError={(e) => {
                console.error('Image failed to load:', e);
              }} width={1000} height={100}   className='z-[-1] w-full h-auto'
                   src={ isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/mobile_CA.jpg' : 
                    "https://www.marjanemall.ma/media/wysiwyg/complement-alimentaire/Slider_compl_ment_alimentaire_desktop.webp"}
                     alt='Beauté - Santé sur MARJANEMALL MAROC'  /> 
               </Link>
            </Carousel.Item>
       
    </Carousel>
    </div>
  )
}

export default Banner