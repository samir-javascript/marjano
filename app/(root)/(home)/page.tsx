
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
  bebeBigSrc,
  bebeSmSrc,
  bebeUrl,
  maisonBigSrc,
  beautySmSrc,
  maisonUrl,
  techBigSrc,
  techSmSrc,
  techUrl,
  useBebeBrands,
  useBrands,
  useMakeupBrands,
  useTechBrands,
  maisonSmSrc,
} from '../../../utils/constants'
import Brands from "@/components/Brands";
import MobileBrands from "@/components/MobileBrands";
import MaisonBanner from "@/components/MaisonBannerj";
import BtnVoitToutes from "@/components/BtnVoitToutes";

export default async function Home() {
 
  const products = await getNosCoupsDeCoursProducts()
  const enCeMomentPros = await getEnCemomentProducts()
  const bonPlansProducts = await getBonPlansProducts()

  const { userId } = auth()
  const user =  await getUserById({clerkId:userId!});
  
 
  
  return (
    <div className="max-sm:!overflow-x-hidden">
       <Banner />
      
       <CategorySlider />
       
       
       <BrandCategoriesSection />
       <BonPlans bonPlansProducts={JSON.stringify(bonPlansProducts)} user={JSON.stringify(user)} />
        <div className="max-w-[1500px] mx-auto flex flex-col ">
        <h2 className="text-[#000] font-extrabold text-[30px]  mt-5 mx-[30px] ">Nos coups de coeur</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px]
        mt-3 lg:items-start justify-center items-center lg:justify-start">
                {products.products.map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
        </div>

        <SumCategories />
        <MaisonBanner mobileSrc={maisonSmSrc} url={maisonUrl} bigScreensSrc={maisonBigSrc} />
        <div className="max-w-[1500px] mx-auto flex flex-col ">
        <h2 className="text-[#000] font-extrabold text-[30px] mt-5 mx-[30px] ">en ce moment</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {enCeMomentPros.products.slice(0,12).map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
            <BtnVoitToutes />
        </div>
        <div className="lg:hidden block">
        <h2 className="text-[#000] font-extrabold max-w-[1400px] mb-3 text-[20px] sm:text-[30px]  mt-5 mx-[35px] ">Le meilleur des grandes marques</h2>
            <MobileBrands useBrands={useBrands} />
          </div>
          <div className="lg:block hidden">
          <h2 className="text-[#000] font-extrabold mb-3 text-[20px] sm:text-[30px] max-w-[1400px] mt-5 mx-[30px] ">Le meilleur des grandes marques</h2>
            <Brands useBrands={useBrands}  />
          </div>
          <MaisonBanner mobileSrc={beautySmSrc} url={beauryUrl} bigScreensSrc={beauryBigSrc} />
        <div className="max-w-[1500px] mx-auto flex flex-col ">
        <h2 className="text-[#000] font-extrabold text-[30px]  mt-5 mx-[30px] ">en ce moment</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {enCeMomentPros.products.slice(12,24).map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
              <BtnVoitToutes />
        </div>
        <div className="lg:hidden block">
        <h2 className="text-[#000] font-extrabold text-[20px] sm:text-[30px] mb-3  max-w-[1400px] mt-5 mx-[35px] ">Le meilleur des grandes marques</h2>
            <MobileBrands useBrands={useMakeupBrands} />
          </div>
          <div className="lg:block hidden">
          <h2 className="text-[#000] font-extrabold text-[20px] sm:text-[30px] mb-3 max-w-[1400px] mt-5 mx-[35px] ">Le meilleur des grandes marques</h2>
            <Brands useBrands={useMakeupBrands}  />
          </div>
          <MaisonBanner mobileSrc={techSmSrc} url={techUrl} bigScreensSrc={techBigSrc} />
        <div className="max-w-[1500px] mx-auto flex flex-col "> 
        <h2 className="text-[#000] font-extrabold text-[30px]  mt-5 mx-[30px] ">en ce moment</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {enCeMomentPros.products.slice(24,36).map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
              <BtnVoitToutes />
        </div>
        <div className="lg:hidden block">
        <h2 className="text-[#000] font-extrabold text-[20px] sm:text-[30px] mb-3 max-w-[1400px] mt-5 mx-[35px] ">Le meilleur des grandes marques</h2>
            <MobileBrands useBrands={useTechBrands} />
          </div>
          <div className="lg:block hidden">
          <h2 className="text-[#000] font-extrabold text-[20px] sm:text-[30px] max-w-[1400px] mb-3 mt-5 mx-[35px] ">Le meilleur des grandes marques</h2>
            <Brands useBrands={useTechBrands}  />
          </div>
          <MaisonBanner mobileSrc={bebeSmSrc} url={bebeUrl} bigScreensSrc={bebeBigSrc} />
        <div className="max-w-[1500px] mx-auto flex flex-col ">
        <h2 className="text-[#000] font-extrabold text-[30px]  mt-5 mx-[30px] ">en ce moment</h2>
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {enCeMomentPros.products.slice(36,48).map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
              <BtnVoitToutes />
        </div>
        <div className="lg:hidden block">
        <h2 className="text-[#000] font-extrabold text-[20px] sm:text-[30px] max-w-[1400px] mb-3 mt-5 mx-[35px] ">Le meilleur des grandes marques</h2>
            <MobileBrands useBrands={useBebeBrands} />
          </div>
          <div className="lg:block hidden">
          <h2 className="text-[#000] font-extrabold text-[20px] sm:text-[30px] max-w-[1400px] mb-3  mt-5 mx-[35px] ">Le meilleur des grandes marques</h2>
            <Brands useBrands={useBebeBrands}  />
          </div>
    </div>
  );
}
