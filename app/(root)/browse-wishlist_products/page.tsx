import Message from "@/components/Message";
import ProductCard from "@/components/ProductCard";
import ProfileMobileTabs from "@/components/ProfileMobileTabs";
import ProfileTable from "@/components/ProfileTable";

const WishlistPage = async() => {

 
 
   const data = [] as any;
  if (!data.wishlist || data.wishlist.products.length === 0) {
    return (
      <div className="w-full h-full bg-slate-50">
        
        <div className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 py-5">
            <ProfileTable />
            <ProfileMobileTabs />
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
     
        <div className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 py-5">
            <ProfileTable />
            <ProfileMobileTabs />
            <div className="flex flex-col flex-1">
                 <h2 className="text-[#000] font-extrabold text-[25px] mx-[20px] ">Ma liste d’envie</h2>
                 <div className="mt-5 w-full max-w-[1000px] ">
                 
                    <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px] md:mx-[20px]  mt-3 items-start justify-center sm:justify-start">
                     
                       {data.wishlist?.products.map((item:any) => (
                        <ProductCard key={item._id} product={JSON.stringify(item)} />
                       ))}
               </div>
                      
                     
                 </div>
            </div>
        </div>
      
        
    </div>
    
    </>
  )
}

export default WishlistPage