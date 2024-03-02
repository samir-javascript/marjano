"use client"

import { useState, useTransition } from 'react';
import Link from 'next/link';

import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaHeart, FaMinus, FaPlus, FaRegHeart, FaShippingFast } from 'react-icons/fa';
import Rating from './Rating';


import { addToCart } from '@/lib/actions/product.actions';

import { usePathname, useRouter } from 'next/navigation';
import  Image from 'next/image'
import { toggleSavedProduct } from '@/lib/actions/user.actions';


 function  ProductDetails({ product, user }: any) {
  const parsedUser = JSON.parse(user)
  const parsedProduct = JSON.parse(product)
  const router = useRouter()
   const pathname = usePathname()
    const [ isPending, startTransition] = useTransition()
  const [thumbnailImages, setThumbnailImages] = useState<string[]>(parsedProduct?.images || []);
  const [selectedImage, setSelectedImage] = useState<string>(thumbnailImages[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const pro = parsedUser?.user?.saved?.includes(parsedProduct._id)
  
  const handleThumbnailClick = (thumbnail: string) => {
    setSelectedImage(thumbnail);
  };
  const handleIncrement = ()=> {
     setQuantity((prevCount)=> prevCount + 1 )
  }
  const handledecrement = ()=> {
    if(quantity === 1) return;
    setQuantity((prevCount)=> prevCount - 1 )
 }
 const handleAddToCart = async()=> {
    if(!parsedProduct._id) return;
     try {
        await addToCart({
            quantity,
            userId: parsedUser.user._id,
            images: parsedProduct.images,
            name: parsedProduct.name,
            price: parsedProduct.price,
            productId: parsedProduct._id,
            path: pathname
        })
        router.refresh()
     } catch (error) {
        console.log(error)
     }
 }
 const handleAddToWishlist = async()=> {
    try {
       await toggleSavedProduct({
         userId: parsedUser?.user?._id,
         path: pathname,
         productId: parsedProduct?._id
       })
       
    } catch (error) {
       console.log(error)
    }
 }
  return (
    <div className="flex !relative w-full flex-col pb-5">
      <Link className="p-4 mx-6" href="/">
        <p className="text-[#00afaa] text-sm hover:underline max-w-[1400px] mx-auto">Accueil</p>
      </Link>
      <div className="pb-4 max-w-[1200px] mx-auto lg:items-start items-center lg:justify-start justify-center flex lg:flex-row flex-col gap-12">
        <div className="sm:mx-[30px] mx-[10px]">
          <Image
           width={300} height={200}
            loading="lazy"
            className="w-full lg:w-[350px] max-h-[100%] h-auto flex-1 rounded-[20px] flex flex-col items-center justify-center object-contain"
            src={selectedImage}
            alt={parsedProduct.name}
          />
          {thumbnailImages.length >= 3 && (
            <div className="max-w-full flex items-center justify-center mt-4 space-x-4">
              {thumbnailImages.map((thumbnail, index) => (
                <Image
                  key={index}
                  width={100} height={100}
                  loading="lazy"
                  className={`sm:w-[100px] object-contain sm:h-[100px] w-[110px] h-[120px]
                   transition-all duration-150 rounded-[10px] cursor-pointer border border-gray-300`}
                  src={thumbnail}
                  alt={parsedProduct.name}
                  onClick={() => handleThumbnailClick(thumbnail)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col mx-[30px]">
          <div className="flex items-center gap-10">
            <h2
              style={{ color: "hsl(220, 13%, 13%)" }}
              className="lg:text-[30px] text-[15px] font-semibold
               lg:leading-[50px] leading-[30px] mb-[15px] capitalize 
               sm:max-w-[600px] max-w-[400px] flex-1"
            >
              {parsedProduct.name}
            </h2>
            <div onClick={handleAddToWishlist} className='sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center sm:bg-[#ddd] '>
              {pro ? <FaHeart size={35} color='red' className=' cursor-pointer' /> : 
              <FaRegHeart size={35} color='#0b4d54' className=' cursor-pointer' />
              } 
            </div>
          </div> 
          <div className="mb-2">
            <Rating value={parsedProduct.rating} text={parsedProduct.numReviews} />
          </div>
          <p className="font-normal text-[16px]">Marque: <Link href={`/browse-boutique-brand/${parsedProduct.brand}`} className="text-[#00afaa] font-bold hover:underline"> {parsedProduct.brand} </Link></p>
          <div className="flex gap-2 items-start justify-start bg-[#ddd] w-fit p-2 rounded-[5px] mt-4">
            <FaShippingFast />
            <p className="max-w-xl font-normal text-sm ">Livraison entre <span className="font-extrabold ">le lundi 29 janvier 2024</span> et <span className="font-extrabold">le jeudi 1 février <br className="lg:block hidden" /> 2024</span></p>
          </div>
          <p style={{ color: "hsl(220, 13%, 13%)" }} className="font-normal text-[16px] sm:max-w-[500px] leading-7 my-4">
            <p style={{ color: 'hsl(220, 13%, 13%)' }} className="font-semibold">À propos de cet article :</p>
            <>
              {showFullDescription ? parsedProduct.description :
               `${parsedProduct.description.slice(0, 150)}...`}
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-[#00afaa] font-semibold ml-2 focus:outline-none hover:underline"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </button>
            </>
          </p>
          <div className="flex sm:flex-col max-md:items-center max-md:justify-between">
            <div className="flex items-center space-x-6">
              <h3 style={{ color: "hsl(220, 13%, 13%)" }} className="font-semibold text-[30px] ">
                ${parsedProduct.price}
              </h3>
              <span
                style={{ backgroundColor: "hsl(25, 100%, 94%)", color: "hsl(26, 100%, 55%)" }}
                className=" rounded-md font-medium text-[18px] px-2"
              >
                50%
              </span>
            </div>
            <p style={{ color: "hsl(219, 9%, 45%)" }} className="line-through font-medium text-[18px] ">
              ${parsedProduct.prevPrice}
            </p>
          </div>
          <div className="flex w-full sm:flex-row flex-col sm:items-center mt-8 sm:space-x-6
           sm:space-y-0 space-y-6">
            <div style={{ backgroundColor: "hsl(0, 0%, 95%)" }} className="flex items-center
             justify-between px-4 h-[50px] py-2.5 rounded-md flex-1">
              <FaMinus  onClick={handledecrement} className="cursor-pointer hover:opacity-[0.6]" />
              <p className="font-semibold text-black ">{quantity}</p>
              <FaPlus onClick={handleIncrement}  className="cursor-pointer hover:opacity-[0.6]" />
            </div>
            <button
            onClick={()=> {
              startTransition(async ()=> await handleAddToCart())
            } }
              id='cartSlide-btn'
              disabled={isPending}
              type="button"
              style={{ backgroundColor: "#00afaa" }}
              className="flex-1 flex items-center whitespace-nowrap text-white h-[40px]
               justify-center gap-x-6 rounded-md transition-all duration-200 hover:opacity-[0.7] py-3"
            >
              <MdOutlineShoppingCart color='white' size={30} className="sm:hidden block" />
              <p className="capitalize font-semibold text-white text-[16px] ">
                 {isPending ? 'loading...': 'Add to cart'}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
