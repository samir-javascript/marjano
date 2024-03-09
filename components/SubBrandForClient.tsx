"use client"

import { useCategoryNames, useClothesBrands } from "@/utils/constants"
import { usePathname, useSearchParams } from "next/navigation"

import MobileBrands from "./MobileBrands"
import Brands from "./Brands"
import { Image } from "react-bootstrap"


const SubBrandForClient = ({searchParams}:any) => {
   const categoryNames = useCategoryNames()
 
  const Params = useSearchParams()
  const query = Params.get('categoryName')
  
  const categoryBanner  = categoryNames.find((item:any) => item.name === searchParams.categoryName)
  const bebeCategoryBanner = categoryNames.find((item:any)=> item.name === "Bébé & Jouets")
 
  return (
    <>
         <div className="w-full">
           {!categoryBanner && (
             <Image fluid alt={bebeCategoryBanner?.name || ""}  src={bebeCategoryBanner?.imageBanner || ""} className="w-full h-full object-contain" />
           )} 
             <Image fluid alt={categoryBanner?.name || ""}  src={categoryBanner?.imageBanner || ""} className="w-full h-full object-contain" />
         </div>
        
         {query === 'vetements' && (
          <>
           <h2 className="text-[#333] font-extrabold text-[30px] w-full mt-5 mx-[30px] ">Nos marques</h2>
            <div className="lg:hidden block mt-3">
            <MobileBrands useBrands={useClothesBrands} />
        </div>
        <div className="lg:block hidden mt-3">
        <Brands useBrands={useClothesBrands}  />
        </div>
        </>
         )}
    </>
  )
}

export default SubBrandForClient