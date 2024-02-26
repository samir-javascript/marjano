
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/actions/product.actions";



export default async function Home() {
  const result = await getProducts({})
  //console.log(result.products[0]); // Will output "object"

  return (
    <div className="w-full flex-1 flex flex-col h-screen">
       <Banner />
       <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]  md:mx-[20px] mt-3 lg:items-start justify-center items-center lg:justify-start">
                {result.products.map((item) => (
                  <ProductCard key={item.name} product={JSON.stringify(item)}  />
                ))}
              </div>
    </div>
  );
}
