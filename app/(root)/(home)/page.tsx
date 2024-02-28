
import Banner from "@/components/Banner";
import CategorySlider from "@/components/CategorySliderComponent/CategorySlider";

import ProductCard from "@/components/ProductCard";
import { getUserById } from "@/lib/actions/cart.actions";
import { getBonPlansProducts, getEnCemomentProducts, getNosCoupsDeCoursProducts, getProducts } from "@/lib/actions/product.actions";
import { auth } from "@clerk/nextjs";
import  BrandCategoriesSection from '@/components/BrandCategoriesSection'
import BonPlans from "@/components/BonPlans";
import SumCategories from "@/components/SumCategories";
import {
  beauryBigSrc,
  beauryUrl,
  beautySmSrc,
  bebeBigSrc,
  bebeSmSrc,
  bebeUrl,
  maisonBigSrc,
  maisonSmSrc,
  maisonUrl,
  techBigSrc,
  techSmSrc,
  techUrl,
  useBebeBrands,
  useBrands,
  useMakeupBrands,
  useTechBrands,
} from "../../../utils/constants"
import Brands from "@/components/Brands";
import MobileBrands from "@/components/MobileBrands";

export default async function Home() {
 
  const products = await getNosCoupsDeCoursProducts()
  const enCeMomentPros = await getEnCemomentProducts()
  const bonPlansProducts = await getBonPlansProducts()

  const { userId } = auth()
 
    const user = userId && await getUserById({clerkId:userId})
  
 
  
  return (
    <div>
       <Banner />
       <CategorySlider />
       <BrandCategoriesSection />
       <BonPlans bonPlansProducts={JSON.stringify(bonPlansProducts)} />
        <div className="max-w-[1400px] mx-auto flex flex-col ">
        <h2 className="text-[#333] font-extrabold text-[30px]  mt-5 mx-[30px] ">Nos coups de coeur</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {products.products.map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
        </div>
        <SumCategories />
        <div className="max-w-[1400px] mx-auto flex flex-col ">
        <h2 className="text-[#333] font-extrabold text-[30px] mt-5 mx-[30px] ">en ce moment</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {enCeMomentPros.products.slice(0,12).map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
        </div>
        <div className="lg:hidden block">
            <MobileBrands useBrands={useBrands} />
          </div>
          <div className="lg:block hidden">
            <Brands useBrands={useBrands}  />
          </div>
        <div className="max-w-[1400px] mx-auto flex flex-col ">
        <h2 className="text-[#333] font-extrabold text-[30px]  mt-5 mx-[30px] ">en ce moment</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {enCeMomentPros.products.slice(12,24).map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
        </div>
        <div className="lg:hidden block">
            <MobileBrands useBrands={useMakeupBrands} />
          </div>
          <div className="lg:block hidden">
            <Brands useBrands={useMakeupBrands}  />
          </div>
        <div className="max-w-[1400px] mx-auto flex flex-col "> 
        <h2 className="text-[#333] font-extrabold text-[30px]  mt-5 mx-[30px] ">en ce moment</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {enCeMomentPros.products.slice(24,36).map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
        </div>
        <div className="lg:hidden block">
            <MobileBrands useBrands={useTechBrands} />
          </div>
          <div className="lg:block hidden">
            <Brands useBrands={useTechBrands}  />
          </div>
        <div className="max-w-[1400px] mx-auto flex flex-col ">
        <h2 className="text-[#333] font-extrabold text-[30px]  mt-5 mx-[30px] ">en ce moment</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {enCeMomentPros.products.slice(36,48).map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
        </div>
        <div className="lg:hidden block">
            <MobileBrands useBrands={useBebeBrands} />
          </div>
          <div className="lg:block hidden">
            <Brands useBrands={useBebeBrands}  />
          </div>
    </div>
  );
}
