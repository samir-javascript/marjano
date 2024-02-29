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
  console.log(query, "nabil query")
  const categoryBanner  = categoryNames.find((item:any) => item.name === searchParams.categoryName)
  return (
    <>
         <div className="w-full">
        
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