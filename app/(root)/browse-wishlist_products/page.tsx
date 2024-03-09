import Message from "@/components/Message";
import PaginateCategories from "@/components/Paginate";
import ProductCard from "@/components/ProductCard";
import ProfileMobileTabs from "@/components/ProfileMobileTabs";
import ProfileTable from "@/components/ProfileTable";
import { getUserById } from "@/lib/actions/cart.actions";
import { getSavedProducts } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import type { Metadata } from "next";

interface props {
  searchParams: {
    page: number;
  }
}

export const metadata: Metadata = {
  title: "Ma liste d’envie",
};
const WishlistPage = async({searchParams}:props) => {

  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
  const result = await getSavedProducts({clerkId:userId!, page: searchParams.page ? +searchParams.page : 1})
  
 
  console.log('WISHLIST PRODUCTS',result)
  if (result?.savedProducts?.length === 0) {
    return (
      <div className="w-full h-full bg-slate-50">
        
        <div className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 lg:py-5">
            <ProfileTable />
            <ProfileMobileTabs user={user} />
            <div className="flex flex-col flex-1">
            <Message className='flex  items-center justify-center' variant="danger">
          Il n’y a aucun article dans votre liste d’envies.
        </Message>
            </div>
           
        </div>
       
      </div>
    );
  }
  return ( 
    <>
    <div className="w-full h-full bg-slate-50">
     
        <div className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 lg:py-5">
            <ProfileTable />
            <ProfileMobileTabs user={user} />
            <div className="flex flex-col flex-1">
                 <h2 className="text-[#000] font-extrabold text-[25px] mx-[20px] ">Ma liste d’envie</h2>
                 <div className="mt-5 w-full max-w-[1000px] ">
                 
                    <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px] md:mx-[20px]  mt-3 items-start justify-center sm:justify-start">
                     
                       {result?.savedProducts?.map((item:any) => (
                        <ProductCard key={item._id} product={JSON.stringify(item)} user={JSON.stringify(user)} />
                       ))}
               </div>
                    
                 </div>
            </div>
        </div>
        <div className="my-3">
            <PaginateCategories page={result.page} pages={result.pages}
             url='/browse-wishlist_products' />
         </div>
    </div>
    
    </>
  )
}

export default WishlistPage