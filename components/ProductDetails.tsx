"use client"

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useToast } from './ui/use-toast';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaHeart, FaMinus, FaPlus, FaRegHeart, FaShippingFast, FaTimes } from 'react-icons/fa';
import Rating from './Rating';


import { addToCart, createReview } from '@/lib/actions/product.actions';

import { usePathname, useRouter } from 'next/navigation';
import  Image from 'next/image'
import { toggleSavedProduct } from '@/lib/actions/user.actions';
import Loader from './Loader';
import { Col, Form, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import YouMlike from './YouMlike';
import Message from './Message';


 function  ProductDetails({ product, user, recommendedProducts }: any) {
  const parsedUser = JSON.parse(user)
  const parsedProduct = JSON.parse(product)
  const parsedRecommendedProducts = JSON.parse(recommendedProducts)
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);
  const  [comment,setComment] = useState("")
  const [rating,setRating] = useState(0)
  const [creatingReview,setCreatingReview] = useState(false)
  const [modalProduct, setModalProduct] = useState({ image: "", name: "" });
   const { toast } = useToast()
  const [ isPending, startTransition] = useTransition()
  const [loading,setIsLoading] = useState(false)
  const [thumbnailImages, setThumbnailImages] = useState<string[]>(parsedProduct?.images || []);
  const [selectedImage, setSelectedImage] = useState<string>(thumbnailImages[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const pro = parsedUser?.user?.saved?.includes(parsedProduct._id)
   const pathname = usePathname()
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
     setIsLoading(true)
    try {
       await toggleSavedProduct({
         userId: parsedUser?.user?._id,
         path: pathname,
         productId: parsedProduct?._id
       })
       setIsLoading(false)
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
       setIsLoading(false)
    }
 }
 const handleCreateReview = async()=> {
  setCreatingReview(true)
    try { 
       await createReview({
         userId: parsedUser?.user?._id,
         productId: parsedProduct._id,
         name: parsedUser?.user?.name,
         comment,
         rating,
         path: pathname
       })
       setCreatingReview(false)
      
       toast({
        title: "your review has been added",
      })
      router.refresh()
    } catch (error) {
       console.log(error)
    }finally {
       setCreatingReview(false)
    }
 }
  return (
    <div className="flex !relative w-full flex-col pb-5">
       {loading && (
          <Loader />
       )}
      <Link className="p-4 mx-6" href="/">
        <p className="text-[#00afaa] text-sm hover:underline max-w-[1400px] mx-auto">Accueil</p>
      </Link>
      <div className="pb-4 max-w-[1200px] mx-auto lg:items-start items-center lg:justify-start justify-center flex lg:flex-row flex-col gap-12">
        <div className="sm:mx-[30px] mx-[10px]">
          <Image
           width={300} height={200}
            priority
            
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
            <Image width={100} height={100} loading="lazy" className="w-[100%] h-[100%] object-contain " src={modalProduct.image} alt={modalProduct.name}  />
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
      <YouMlike recommendedProducts={parsedRecommendedProducts} user={parsedUser}  />
      <div className="w-full ">

     
<Row className='review m-3 max-w-[1400px] mx-auto'>
    <Col className="lg:mx-6 mx-2 " md={7} >
      {parsedProduct?.reviews.length === 0 ? (
<h2 className="mt-5 mb-4"> Reviews</h2>
      ): (
        <h2 className="mt-5 mb-4"> {parsedProduct?.reviews.length !== 0 && parsedProduct?.reviews.length} 
        {parsedProduct?.reviews.length > 1 ? " Reviews" :  " Review" }</h2>
      )}
       
       
        <ListGroup variant='flush'>
            {parsedProduct?.reviews.map((item:any) => (
               <ListGroup.Item key={item._id}>
                   <div className="flex  items-start lg:flex-row flex-col ">
                    <div className="flex mt-1 items-center gap-x-4">
                        <div className="bg-[#efefef] w-[40px] h-[40px] rounded-full flex items-center justify-center ">
                             <p className="text-base font-medium text-[#0aafaa] ">{item.name.charAt(0)} </p>
                        </div>
                        <div className="flex flex-col gap-1">
                              <Rating value={item.rating}  />
                              <p className="font-normal text-base text-[#4c4c4c] ">{item.name} </p>
                        </div>
                    </div>
                        <div className="bg-[#e9e8e8] w-full p-2 lg:mt-0 mt-2.5 lg:ml-10 rounded-xl lg:flex-1 ">
                            <p className="text-gray-500 text-sm font-normal">{item.comment} </p>
                            <p className="text-sm text-gray-400 font-normal !pt-1.5">{ item.createdAt.substring(0,10)} </p>
                        </div>
                   </div>
               </ListGroup.Item>
            ))}
            <ListGroup.Item>
               {user ? (
                <>
                <h3 className="mt-5 lg:text-[22px] text-[20px] 
                 lg:whitespace-nowrap mb-3 text-black font-semibold ">Veuillez laisser votre commentaire pour ce produit.</h3>
                 <Form onSubmit={handleCreateReview}>
                    <Form.Group controlId='rating' className='my-2'>
                       <Form.Label className="font-bold text-[22px] font-Roboto text-[#4c4c4c]">Rating</Form.Label>
                       <Form.Control  required as='select' value={rating}
                        onChange={(e)=> setRating(Number(e.target.value))} >
                          <option value="">select...</option>
                          <option value={1}>1 - poor</option>
                          <option value={2}>2 - fair</option>
                          <option value={3}>3 - good</option>
                          <option value={4}>4 - very good</option>
                          <option value={5}>5 - excellent</option>
                       </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment' className='my-2 mt-4 '>
                       <Form.Label className="font-bold text-[22px] text-[#4c4c4c] ">Comment</Form.Label>
                      
                       <Form.Control required as='textarea' value={comment} rows={4} className="border border-blue-500"
                       placeholder='Écrire un avis client sur MarjaneMall'
                        onChange={(e)=> setComment(e.target.value)} >
                         
                       </Form.Control>
                    </Form.Group>
                    <button
      disabled={creatingReview}
      type="submit"
      className="bg-[#00afaa] mt-2 mx-auto text-white font-bold w-[250px] h-[40px] rounded-[20px] "
    >
      {creatingReview ?  <Spinner role='status' animation='border' style={{
          display:'block',
          width:'30px',
          height:'30px',
          margin:'auto',
          color:'#fff'
        }} >
          </Spinner> : 'valider'}
    </button>
                 </Form>
                 </>
               ) : (
                      <Message> <p className="text-black ">
                        Veuillez <span><Link className="underline text-[#0aaffa] " href='/auth'>vous connecter</Link> </span>  pour rédiger un avis.
                        </p>  </Message>
               )}
            </ListGroup.Item>
        </ListGroup>
    </Col>
 </Row>
 </div>
    </div>
  );
}

export default ProductDetails;
