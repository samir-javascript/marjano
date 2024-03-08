import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/actions/product.actions'

import Link from 'next/link';

import SubBrandForClient from '@/components/SubBrandForClient';
import { auth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/cart.actions';
import PaginateCategories from '@/components/Paginate';
interface props {
  searchParams: {
     categoryName: string;
     page: number;
  }
}

const Page = async({searchParams}:props) => {
 
  

  const result = await getProductsByCategory({ categoryName: searchParams.categoryName , page : searchParams.page ? +searchParams.page: 1});
 
  const { userId } = auth()
   if(!userId) return;
  const user = await getUserById({clerkId:userId})
  return (
    <div className="w-full ">
    
       <div className="max-w-[1400px] mx-auto ">
          <div className="flex items-center mx-3 gap-x-3 p-3 text-[#4c4c4c]  ">
          <Link className="underline text-[#0aaffa] text-sm capitalize font-semibold" href='/'>
               accueil
           </Link>
            <p className="font-normal text-sm ">
               &gt;
            </p>
            <p className="font-normal text-sm ">{searchParams.categoryName} </p>
          </div>
          
       </div>
       
       <SubBrandForClient searchParams={searchParams}  />
       <div className="max-w-[1400px] mx-auto pb-4">
          <h2 className="text-[#333] font-extrabold text-[30px] mt-5 w-full mx-[30px] ">
               {searchParams.categoryName}
          </h2>
          <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px] md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
            {result.products.map((item:any) => (
              <ProductCard user={JSON.stringify(user)} key={item._id} product={JSON.stringify(item)} />
            ))}
          </div>
        
        </div>
      <PaginateCategories page={result.page} pages={result.pages} categoryName={searchParams.categoryName} url="/browse-products" /> 
  </div>
    )
}

export default Page