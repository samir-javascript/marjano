/* eslint-disable react/no-unescaped-entities */
import BrandFilter from "@/components/FilterComponent/BrandFilter";
import CategoryFilter from "@/components/FilterComponent/CategoryFilter";
import ClearFilter from "@/components/FilterComponent/ClearFilter";
import FilterPrice from "@/components/FilterComponent/FilterPrice";
import RatingFilter from "@/components/FilterComponent/FilterRating";

import PaginateCategories from "@/components/Paginate";


import ProductCard from "@/components/ProductCard";

import { getUserById } from "@/lib/actions/cart.actions";

import { getProducts } from "@/lib/actions/product.actions";

import { auth } from "@clerk/nextjs";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Best sellers | marjanemall maroc",
};
interface props {
  searchParams: {
     page: number;
     filter: string;
     filterRating: number;
   
  }
}
const Page = async({searchParams}:props) => {
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
  const products = await getProducts({page: searchParams.page ? +searchParams.page : 1, filterRating: searchParams.filterRating , filter: searchParams.filter})

  
 

 
 
  return (
    <div className='w-full  bg-slate-50 py-5'>
                <h2 className="text-[#000] max-w-[1400px] mx-auto font-extrabold pl-5 text-[30px] mb-5">Best Sellers</h2>
   
    <div className="max-w-[1400px] lg:mx-auto lg:py-5 
     py-2  flex lg:flex-row flex-col gap-4 justify-start items-start w-full  mx-[20px]">
       <div className="flex flex-col gap-3 lg:pl-5">
         {searchParams.filter ? (
           <ClearFilter />
         ) : searchParams.filterRating ?  <ClearFilter /> : null}
       <div  className="flex lg:flex-col flex-wrap gap-4 max-sm:mb-4 lg:w-[400px] w-full  ">
           <CategoryFilter />
           <BrandFilter />
           <RatingFilter />
       </div>
       </div>
      
      <div className='flex flex-col flex-1 lg:max-w-[1300px]'>
      {products.products.length > 0 ? (
 <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] 
 lg:items-start justify-center items-center lg:justify-start">
          {products.products.map((item) => (
            <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
          ))}
        </div>
      ): (
         <p>No product was found</p>
      )}
     
     
       
       
      </div>
    </div>
     <div className="my-4">
        <PaginateCategories page={products.page} pages={products.pages} filterRating={searchParams.filterRating}
         url={"/marjanemall_Products_list"} filterName={searchParams.filter}  />
     </div>
    </div>
  );
}

export default Page;