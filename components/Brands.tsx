"use client"
import  Image  from "next/image"

import  Link  from "next/link"
const Brands = ({useBrands}:any) => {
   const brand = useBrands()
  
  return (
    <div className="max-w-[1400px] mx-auto mt-2 mb-5 lg:block hidden ">
         <div className="flex items-center gap-x-8  justify-center  gap-y-5  mx-5 ">
                {brand.map((item:any,index:number)=> (
                    <Link href={`/browse-boutique-brand?brandName=${item.url}`}
                     className="rounded-md bg-[#f1f1f1] px-3 py-1 flex 
                     items-center justify-center w-[200px]   h-[70px]   "
                      key={index}>
                        <Image alt={item.url} width={130} height={100}
                          className={` w-[130px] object-contain max-w-full h-full`} src={item.src}  />
                    </Link>
                ))}
         </div>
    </div>
  )
}

export default Brands