"use client"
import  { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';
import Link from 'next/link'
import React from 'react';
interface props {
   url: string;
   mobileSrc: string;
   bigScreensSrc: string;
}
const MaisonBanner = ({url, mobileSrc, bigScreensSrc}:props) => {
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
  return (
    <Link href={url} className='max-w-[1400px] mx-auto  '>
       <Image alt={url} fluid className='lg:!w-full lg:!h-auto !h-[100px] lg:!object-contain !object-cover lg:!mx-auto !w-auto ' src={isMobile ? mobileSrc : bigScreensSrc} />
    </Link>
  )
}

export default MaisonBanner