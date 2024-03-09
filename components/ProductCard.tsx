/* eslint-disable react/prop-types */
"use client";
import { useState } from 'react';
import { FaCheck, FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useRouter,  usePathname } from "next/navigation";
import Link from 'next/link';

import Rating from './Rating';

import { addToCart } from '@/lib/actions/product.actions';
//import Image from 'next/image';
import { toggleSavedProduct } from '@/lib/actions/user.actions';
import { Image, Modal } from 'react-bootstrap';
import Loader from './Loader';
const ProductCard = ({product, user}:any) => {

 const parsedProduct = JSON.parse(product)

  const parsedUser = user && JSON.parse(user)
 
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showProductModel,setShowProductModel] = useState(false)
  const [modalProduct, setModalProduct] = useState({ image: "", name: "" });
  const [isLoading,setIsLoading] = useState(false)
  const [isAdding,setIsAdding] = useState(false)
  const pathname = usePathname()

  const pro = parsedUser?.user?.saved?.includes(parsedProduct._id)
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart({
        quantity: 1,
        userId: parsedUser.user._id,
        productId: parsedProduct._id,
        name: parsedProduct.name,
        price: parsedProduct.price,
        path: pathname,
      });
      setIsLoading(false);
      setShowProductModel(true); // Change this line
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setShowProductModel(true);
    }
  };
  
 const loading = false
 const handleAddToWishlist = async()=> {
  setIsAdding(true)
  try {
     await toggleSavedProduct({
       userId: parsedUser?.user?._id,
       path: pathname,
       productId: parsedProduct?._id
     })
     setIsAdding(false)
     if (!pro) {
      setModalProduct({
        image: parsedProduct?.images[0],
        name: parsedProduct?.name,
      });
      setShowModal(true);
    }
  } catch (error) {
     console.log(error)
  }finally {
    setIsAdding(false)
  }
}
  return (
    <>
    
        <div  className={` sm:w-[200px]  max-sm:w-[161px] max-w-full border mx-2
                 border-[rgba(211,211,211,0.78)] rounded-xl min-h-auto h-[375px]  flex flex-col`}>
              {isLoading  && (
                <Loader />
              )}
               {isAdding  && (
                <Loader />
              )}
          <div className="w-full h-[200px] relative flex items-center 
                   justify-center bg-[#f6f6f6] rounded-tl-xl rounded-tr-xl ">
            <Link href={`/products/${parsedProduct._id}`}>
             <Image   width={140} height={200}   className={`
               w-auto aspect-auto  
               h-[100%] rounded-tl-xl rounded-tr-xl !z-[-1] object-contain`}
             src={loading ? "/images/lodingGif.gif" : parsedProduct.images[0]} alt={parsedProduct.name}  />
            </Link>
            <div onClick={handleAddToWishlist} className='absolute bottom-0 right-0 m-3 w-[35px] h-[35px] rounded-full flex items-center justify-center bg-white '>
              
              {pro ? <FaHeart data-tooltip-id='my-tooltip'
                  data-tooltip-content="Ajouter à ma list d'envie" size={35} color='red' className='w-[65%] h-[65%] outline-none border-none object-contain cursor-pointer' /> : 
              <FaRegHeart size={35}  color='#0b4d54' className='w-[65%] h-[65%] outline-none border-none object-contain cursor-pointer' /> }
  
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
          <Modal show={showModal} onHide={() => setShowModal(false)}>
        <div onClick={() => setShowModal(false)} className="p-3 ">
          <FaTimes cursor='pointer' color='gray' size={24} />
        </div>
        <Modal.Header closeButton>
          <Modal.Title className="text-[#333] font-bold text-[16px] w-full flex flex-col gap-1 text-center ">
            <p>{modalProduct.name} </p>
            <p>has been added to your wish list</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex max-w-full mx-auto items-center justify-center w-[150px] h-[150px] bg-[#ddd] ">
            <Image loading="lazy" className="w-[100%] h-[100%] object-contain " src={modalProduct.image} alt={modalProduct.name} fluid />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link className="w-full flex justify-center" href='/browse-wishlist_products'>
            <button className="px-4 py-2 rounded-[15px] w-full font-bold text-[15px] bg-[#00afaa]  text-white transition-all duration-150 hover:bg-[#0b4d54] ">
              Accedez a votre liste
            </button>
          </Link>
        </Modal.Footer>
      </Modal>
      <Modal show={showProductModel} onHide={() => setShowProductModel(false)}>
              <div onClick={()=> setShowProductModel(false)} className="p-3 ">
                 <FaTimes cursor='pointer' color='gray' size={20} />
              </div>
              <Modal.Header className="border-none" closeButton>
                <Modal.Title className="text-[#00afaa] font-bold text-[16px] flex items-center gap-x-2  text-center "> 
                  <div className='flex items-center justify-center border border-[#00afaa] w-[45px] h-[45px] rounded-full '>
                      <FaCheck  size={22} color='#00afaa' />
                  </div> 
                   <p className="w-full text-[#00afaa] font-normal text-[18px] text-center mx-auto "> Votre produit a été ajouté au panier</p>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body >
              <div className="flex flex-col gap-2 ">
 <div>
             <div className="flex items-start justify-start">
               <div className="w-[120px] h-[120px] bg-[#efefef] rounded-md flex items-center justify-center m-3 mb-1">
                  <Image width={100} height={100} alt={parsedProduct.name} className="w-[100%] h-[100%] object-contain " 
                   src={parsedProduct.images[0]} />
               </div>
               <div className="flex flex-col flex-1">
                 <div className="m-3 flex items-center gap-2">
                   <p className="line-clamp-1 font-medium text-[#555] mb-1 text-[15px] ">{parsedProduct.name}</p>
                 </div>
                 <p className="font-normal text-[16px] mx-3">Vendu par <span className="text-[#00afaa]">{parsedProduct.brand}</span></p>
                 <p className="text-[#00afaa] font-semibold mt-3 mx-3 text-[20px]">{parsedProduct.price} Dh</p>
               </div>
             </div>
           </div>
             
          
            </div>
              </Modal.Body>
              <Modal.Footer className="border-none"> 
              <Link className="w-full flex justify-center" href='/cart'>
            <button className="px-4 py-2 rounded-[15px] w-full font-bold text-[15px] bg-[#00afaa]  text-white transition-all duration-150 hover:bg-[#0b4d54] ">
              Accedez a votre cart
            </button>
          </Link>
               
              </Modal.Footer>
            </Modal>
        </div>
      
    </>
  );
}

export default ProductCard;
