/* eslint-disable react/prop-types */
"use client";
import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useRouter, useParams, usePathname } from "next/navigation";
import Link from 'next/link';

import Rating from './Rating';

import { addToCart } from '@/lib/actions/product.actions';
import Image from 'next/image';



const ProductCard = ({product, user}:any) => {

 const parsedProduct = JSON.parse(product)

  const parsedUser = user && JSON.parse(user)
 
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState({ image: "", name: "" });
  const pathname = usePathname()
  //if(loadingADDtoWishlist) return <Loader />
  const handleAddToCart = async()=> {
   // if(!product._id) return;
     try {
        await addToCart({
            quantity: 1,
            userId: parsedUser.user._id,
            productId: parsedProduct._id,
            name: parsedProduct.name,
            price: parsedProduct.price,
         
            path:pathname
        })
       
      
     } catch (error) {
        console.log(error)
     }
 }
  return (
    <>
    
        <div  className={` sm:w-[200px]  max-sm:w-[161px] max-w-full border mx-2
                 border-[rgba(211,211,211,0.78)] rounded-xl min-h-auto h-[375px]  flex flex-col`}>
                 
          <div className="w-full h-[200px] relative flex items-center 
                   justify-center bg-[#f6f6f6] rounded-tl-xl rounded-tr-xl ">
            <Link href={`/products/${parsedProduct._id}`}>
             <Image  width={140} height={200} loading='lazy'  className={`
               w-auto aspect-auto  
               h-[100%] rounded-tl-xl rounded-tr-xl !z-[-1] object-contain`}
             src={parsedProduct.images[0]} alt={parsedProduct.name} />
            </Link>
            <div className='absolute bottom-0 right-0 m-3 w-[35px] h-[35px] rounded-full flex items-center justify-center bg-white '>
              <>
                <FaRegHeart color='#0b4d54' className='w-[65%] h-[65%] outline-none border-none object-contain cursor-pointer'
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content="Ajouter à ma list d'envie"
                />
              </>
            </div>
          </div>

          <div className="flex flex-col items-start  bg-white h-full rounded-bl-xl rounded-br-xl ">
            <div className="flex flex-col px-3 pt-2 h-full w-full">
              <Link href={`/products/${parsedProduct._id}`}>
                <p className="text-[13px] text-[#4c4c4c]  no-underline
                 hover:text-[#00afaa] hover:underline font-medium line-clamp-2">{parsedProduct.name} </p>
              </Link>
              <p className="font-normal text-[13px] text-[#222222]  ">
                Vendu par <span className="text-[#00afaa]">{parsedProduct.brand} </span></p>
            </div>
            {parsedProduct.rating >= 1 && (
              <div className='px-3'>
                <Rating value={parsedProduct.rating} text={parsedProduct.numReviews} />
              </div>
            )}
            <div className="flex items-center justify-between w-full p-3">
              <div className="flex flex-col items-start">
                <p className="font-bold text-[#00afaa] text-[18px] ">{parsedProduct.price}Dh </p>
                <p className="font-normal text-[#555] text-[13px] line-through ">{parsedProduct.prevPrice}Dh </p>
              </div>
              <div onClick={handleAddToCart} className="rounded-full bg-[#00afaa] w-[35px] h-[35px] text-white flex items-center justify-center">
                <MdOutlineShoppingCart
                  color='white' className="w-[65%] h-[65%] outline-none border-none  cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}

export default ProductCard;
