import ProductCard from "./ProductCard"


const YouMlike = ({recommendedProducts,  user}:any) => {
    
  return (
    <div className="mt-5 max-w-[1400px] mx-auto ">
        <h2 className="text-center font-bold text-black sm:text-[40px] text-[30px] ">You may also Like</h2>
        <div className="flex flex-wrap md:gap-[25px]  gap-y-[15px] md:mx-[20px]  mt-3 lg:items-start justify-center items-center lg:justify-start">
             {recommendedProducts.map((item:any) => (
               <ProductCard key={item._id} product={JSON.stringify(item)} user={JSON.stringify(user)} />
            ))}
        </div>
    </div>
  )
}

export default YouMlike