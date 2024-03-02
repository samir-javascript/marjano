
import ImageBanner from '@/components/ImageBanner';
import ProductCard from '@/components/ProductCard';
import { getUserById } from '@/lib/actions/cart.actions';
import { getProductsByBrand } from '@/lib/actions/product.actions';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';


interface Props {
  searchParams: {
     brandName: string;
  }
}
const page = async({searchParams}:Props) => {
  const result = await getProductsByBrand({brandName: searchParams.brandName})
  const { userId } = auth()
    const user = userId && await getUserById({clerkId:userId})
 
  return (
    <div className="w-full ">
     
      <div className="max-w-[1400px] mx-auto ">
        <div className="flex flex-col p-3 text-[#4c4c4c]  ">
          <div className="flex items-center mx-3 gap-x-3 mb-2">
            <Link className="!underline text-[#0aaffa] text-sm capitalize font-semibold" href="/">
              accueil
            </Link>
            <p className="font-normal text-sm ">&gt;</p>
            <p className="font-normal text-sm uppercase">{searchParams.brandName} </p>
          </div>
          <h2 className="uppercase mx-3 font-extrabold text-black text-[30px] ">{searchParams.brandName} </h2>
        </div>
      </div>
      <ImageBanner searchParams={searchParams} />
     

      <div className={` max-w-[1400px] mx-auto pb-4`}>
        <h2 className="text-[#333] font-extrabold lg:text-[30px] text-[20px] w-full mt-5 mb-1 mx-2 lg:mx-[30px] ">Notre sélection du moment</h2>
        <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px] md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
          {result ? (
            result.map((item:any) => <ProductCard user={JSON.stringify(user)} key={item._id} product={JSON.stringify(item)} />)
          ) : (
            <p>no products found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default page