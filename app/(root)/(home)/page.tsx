
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import { getUserById } from "@/lib/actions/cart.actions";
import { getProducts } from "@/lib/actions/product.actions";
import { auth } from "@clerk/nextjs";



export default async function Home() {
  const result = await getProducts({})
  //console.log(result.products[0]); // Will output "object"
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
  return (
    <div className="w-full flex-1 flex flex-col h-screen">
       <Banner />
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {result.products.map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                ))}
              </div>
    </div>
  );
}
