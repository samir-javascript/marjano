"use client"

import { useBrands, useClothesBrands, useMakeupBrands, useTechBrands } from "@/utils/constants";
import { Image } from "react-bootstrap";
interface props {
     searchParams: {
        brandName: string;
     }
}
const ImageBanner = ({searchParams}:props) => {
    const brands = useBrands();
    const makeUpBrands = useMakeupBrands();
    const techBrands = useTechBrands();
    const clothesBrands = useClothesBrands()
    const imageBanner = brands.find((item:any) => item.url === searchParams.brandName);
    const makeUpImageBanner = makeUpBrands.find((item:any) => item.url === searchParams.brandName);
    const techImageBanner = techBrands.find((item :any)=> item.url === searchParams.brandName);
    const clothesImageBanner = clothesBrands.find((item:any) => item.url === searchParams.brandName)
    // Choose the banner based on priority
    const selectedBanner = techImageBanner || clothesImageBanner || makeUpImageBanner || imageBanner;
  return (
    <>
    {(selectedBanner && selectedBanner.imageBanner) && (
        <div className="relative w-full ">
          <div className={`${selectedBanner?.imageBanner ? "lg:block" : "hidden"} absolute  hidden w-full right-0 h-[200px] bottom-0 left-0 bg-for-brand z-20`} />
          <div>
            <Image alt='' loading="lazy" src={selectedBanner?.imageBanner} fluid />
          </div>
        </div>
      )}
      </>
  )
}

export default ImageBanner