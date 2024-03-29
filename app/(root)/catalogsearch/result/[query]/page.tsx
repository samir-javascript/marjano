/* eslint-disable react/no-unescaped-entities */
import Message from '@/components/Message';
import PaginateCategories from '@/components/Paginate';
import ProductCard from '@/components/ProductCard';
import { getUserById } from '@/lib/actions/cart.actions';
import { getProducts } from '@/lib/actions/product.actions'
import { auth } from '@clerk/nextjs';

import Link from 'next/link';
import React from 'react'
interface props {
    params: {
        query: string;
      
    };
    searchParams: {
      page: number;
    }
}

export async function generateMetadata({ params}:props) {
  
  return {
    title: `Résultats de recherche pour : ${decodeURIComponent(params.query.trim())}`,
  }
}
const page = async({params, searchParams}:props) => { 
    const result = await getProducts({searchQuery:decodeURIComponent(params.query.trim()), page:searchParams.page ? +searchParams.page : 1 })
    const { userId } = auth()
 
    const user = userId && await getUserById({clerkId:userId})
  
  return (
    <div className='w-full'>
        <div className="max-w-[1400px] mx-auto ">
          <div className="flex  items-center mx-3 gap-x-3 p-3 text-[#4c4c4c]  ">
          <Link className="underline text-[#0aaffa] text-sm capitalize font-semibold" href='/'>
               accueil
           </Link>
            <p className="font-normal text-sm ">
               &gt;
            </p>
            <p className="font-normal text-sm ">Résultats de recherche pour : '{decodeURIComponent(params.query)}' </p>
          </div>
          <h2 className="text-[#000] sm:font-extrabold font-bold sm:text-[30px] text-[20px]  mt-2 mx-[30px] ">Résultats de recherche pour : '{params.query}' </h2>
          <div className="flex flex-wrap md:gap-[15px]  gap-y-[15px]   my-4
           md:mx-[20px] mt-4 lg:items-start justify-center items-center lg:justify-start">
                {result.products.length !== 0 ? result.products.map((item) => (
                  <ProductCard key={item.name} user={JSON.stringify(user)} product={JSON.stringify(item)}  />
                )): (
                     <Message 
                      className='flex justify-center items-center w-[70%] mx-auto ' variant='danger'>
                           0 résultat pour {params.query}
                     </Message>
                )}
              </div>
       </div>
          <div className="my-4">
              <PaginateCategories page={result.page} pages={result.pages} url={`/catalogsearch/result/${params.query}`}  />
          </div>
    </div>
  )
}

export default page