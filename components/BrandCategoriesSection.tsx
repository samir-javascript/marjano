 /* eslint-disable react/no-unescaped-entities */
 import { Image } from "react-bootstrap"

 
import  Link  from "next/link"
 const BrandCategoriesSection = () => {
    
   return (
     <div className="max-w-[1400px] mx-auto pb-7 pt-12">
          <h2 className="text-[#333] font-extrabold text-[30px] my-3 w-full mx-[30px] ">Offres en vedette</h2>
         <div className="flex items-center lg:flex-row flex-col   gap-3 mx-6 justify-between  ">
              <Link href='/browse-boutique-brand/samsung' className=" relative">
                 <div className="absolute inset-0  rounded-[10px] bg-[rgba(0,0,0,0.3)] top-0 left-0 " />
                 <div className="absolute top-0 left-0  p-3 z-3 text-white flex items-center justify-between w-full">
                      <h3 className="mt-2 font-bold text-[26px] ">Smart Tv HD & <br /> led 32"</h3>
                      <div className="w-[100px] h-[100px]  flex items-center justify-center rounded-full bg-[rgba(225,225,255,0.9)] ">
                         <div className="flex flex-col items-center justify-center">
                         <span className="text-[20px] font-extrabold text-red-500 ">1540 dhs</span>
                          <strong className="text-[18px] line-through font-extrabold text-[#4c4c4c] ">1999 dhs</strong>
                         </div>
                         
                      </div>
                 </div>
                   <Image alt='' loading="lazy" className="rounded-[10px] z-3 w-full object-contain "
                    src="/images/sumsung.webp" fluid  />
              </Link>
              <Link href='/browse-boutique-brand/celio' className=" relative">
                 <div className="absolute inset-0  rounded-[10px] bg-[rgba(0,0,0,0.3)] top-0 left-0 " />
                 <div className="absolute top-0 left-0  py-1 px-3 z-3 text-white flex items-center justify-between w-full">
                      <h3 className=" font-bold text-[26px] ">Celio*</h3>
                      <div className="w-[100px]  h-[100px]  flex items-center justify-center rounded-full bg-[rgba(225,225,255,0.9)] ">
                         <div className="flex flex-col items-center justify-center">
                         <span className="text-[20px] font-extrabold text-[#4c4c4c] ">jusqu'a</span>
                          <strong className="text-[22px] text-red-500 font-extrabold  ">-50 %</strong>
                         </div>
                         
                      </div>
                 </div>
                   <Image alt='hy' loading="lazy" className="rounded-[10px] z-3  w-full object-contain"
                    src="/images/celio.webp" fluid  />
              </Link>
              <Link href='/browse-boutique-brand/Maybelline' className=" relative">
                 <div style={{
    position: 'absolute',
    top: 0,
    inset: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.0) 100%)',
  }}/>
                 <div className="absolute top-0 left-0  py-1 px-3 z-3 text-white flex items-center justify-between w-full">
                      <h3 className=" font-bold text-[26px] ">Rèvèlez votre <br /> personalitè</h3>
                      <div className="w-[100px]  h-[100px]  flex items-center justify-center rounded-full bg-[rgba(225,225,255,0.9)] ">
                         <div className="flex flex-col items-center justify-center">
                         <span className="text-[20px] font-extrabold text-[#4c4c4c] ">jusqu'a</span>
                          <strong className="text-[22px] text-red-500 font-extrabold  ">-50 %</strong>
                         </div>
                         
                      </div>
                 </div>
                   <Image alt='' loading="lazy" className="rounded-[10px] z-3 w-full object-contain"
                    src="/images/cosmitic.webp" fluid  />
              </Link>
         </div>
     </div>
   )
 }
 
 export default BrandCategoriesSection