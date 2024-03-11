 "use client"
 import { Image, Modal } from "react-bootstrap";
//import Image from 'next/image'
import { FaTimes, FaTrash, FaMinus, FaPlus, FaCheck } from "react-icons/fa"
import { useEffect, useState, } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { addToCart } from "@/lib/actions/product.actions";
const CartSide = ({result,user}:any) => {
  //const user = JSON.parse(user)
 const Parsedresult = JSON.parse(result)
    const router = useRouter()
    const pathname  = usePathname()
    const [showModal,setShowModal] = useState(false)
    const [loading,setLoading] = useState(false)
    
    const handleUpdateCart = async(type:string, parsedItem:any)=> {
      try {
       setLoading(true)
        if(type === 'increase') {
          
          await addToCart({
            quantity: 1,
            name: parsedItem.productId.name,
            price: parsedItem.productId.price,
            
            userId: user.user._id,
            productId: parsedItem.productId._id,
            path:pathname
        })
        setLoading(false)
        router.refresh()
        }else if(type === 'decrease') {
          setLoading(true)
          if(parsedItem.quantity <= 1) {
            return;
          }
          await addToCart({
            quantity: -1,
            userId: user.user._id,
            productId: parsedItem.productId._id,
            name: parsedItem.productId.name,
            price: parsedItem.productId.price,
            
            path:pathname
        })
        setLoading(false)
        router.refresh()
        }else if(type === 'remove') {
          setLoading(true)
          await addToCart({
            quantity: -parsedItem.quantity,
            userId: user.user._id,
            name: parsedItem.productId.name,
            price: parsedItem.productId.price,
            productId: parsedItem.productId._id,
            path:pathname
        })
        setLoading(false)
        router.refresh()
        setShowModal(false)
        }
     } catch (error) {
        console.log(error)
     }finally {
      setLoading(false)
     }
    }

 
  const closeCartSlide = () => {
   
   const menu = document.getElementById('menu-cart')
    menu?.classList.remove('show-menu')
    document.body.classList.remove('stop-scrolling')
  }
  useEffect(() => {
    const menu = document.getElementById("menu-cart");
    menu?.classList.remove("show-menu");
    document.body.classList.remove("stop-scrolling");
  }, [pathname]);
 
  return (
    <div  id='menu-cart' className="fixed z-[999]   overflow-x-hidden right-0 top-0 max-sm:w-[300px] w-[400px] 
    h-screen bg-white 
      border-l  border-[#ddd] transition-transform duration-200 ease-in-out   transform translate-x-[100%] ">
        {loading && (
            <div className="flex fixed top-0 bg-[rgba(255,255,255,0.99)] left-0 w-full justify-center h-full items-center">
               <Image alt='loader' src='/images/lodingGif.gif' fluid  />
            </div>
         )}
        <div className="sticky top-0 flex items-center bg-white justify-between p-2 border-b border-[#ddd]  ">
             <p className="font-bold text-[16px] ">mon panier</p>
             <FaTimes onClick={closeCartSlide} id="close-btn" color='gray' cursor='pointer' />
        </div>
        {Parsedresult?.cart?.cartItems.length === 0 ? (
             <div className="flex items-center text-center justify-center mt-5">
                 <p className="font-bold text-base ">Aucun article dans votre panier.</p>
             </div>
        ) : (
          <>
          <div className="flex flex-col h-full w-full overflow-y-auto  px-2">
          {Parsedresult?.cart?.cartItems.map((item:any,index:number)=> (
        
          <div key={index} className="flex flex-col gap-2 border-b border-[#ddd]">
 <div>
             <div className="flex items-start justify-start">
               <div className="w-[120px] h-[120px] bg-[#efefef] rounded-md flex items-center justify-center m-3 mb-1">
                  <Image width={100} height={100} alt={item.name} className="w-[100%] h-[100%] object-contain " 
                   src={item.productId.images[0]} />
               </div>
               <div className="flex flex-col flex-1">
                 <div className="m-3 flex items-center gap-2">
                   <p className="line-clamp-1 font-medium text-[#555] text-[15px] ">{item.name}</p>
                   <FaTrash size={25} onClick={()=> setShowModal(true)} className="cursor-pointer " color='red' />
                 </div>
                 <p className="font-normal text-[16px] mx-3">Vendu par <span className="text-[#00afaa]">{item.productId.brand}</span></p>
               </div>
             </div>

             <div className="flex items-center justify-between">
               <div className="flex items-center justify-between mx-3 mb-2 border border-[#ddd] px-3 py-1 rounded-xl w-[140px]">
                 <FaMinus   size={14} className="cursor-pointer" color='#00afaa' onClick={() => handleUpdateCart("decrease",item)} />
                 <p className="font-semibold text-black">{item.quantity}</p>
                 <FaPlus size={14} className="cursor-pointer" color='#00afaa' onClick={() => handleUpdateCart("increase",item)} />
               </div>
               <div>
                 <p className="text-[#00afaa] font-semibold text-[20px]">{(item.quantity * parseFloat(item.price)).toFixed(2)} Dh</p>
               </div>
             </div>
             
           </div>
              <Modal show={showModal} onHide={() => setShowModal(false)}>
              <div onClick={()=> setShowModal(false)} className="p-3 ">
                 <FaTimes cursor='pointer' color='gray' size={20} />
              </div>
              <Modal.Header className="border-none" closeButton>
                <Modal.Title className="text-[#333] font-bold text-[16px]  text-center "> 
                    <p className="w-full text-center mx-auto ">Êtes-vous sûr(e) de vouloir retirer cet article du panier ? </p>
                </Modal.Title>
              </Modal.Header>
             
              <Modal.Footer className="border-none"> 
                <div className="w-full flex justify-center gap-x-3">
                <button
        type="button"
       
         onClick={()=> handleUpdateCart("remove", item)}
        className="px-3 py-2 rounded-[15px] w-full font-bold text-[15px] bg-[#00afaa]  text-white"
      >
        Valider
      </button>
                     <button type="button" onClick={()=> setShowModal(false)}   className="px-3 py-2 rounded-[15px] w-full font-bold text-[15px] border border-[#00afaa]  text-[#00afaa] 
                      ">
                        Annuler
                     </button>
                </div>
               
              </Modal.Footer>
            </Modal>
          
            </div>
         ))}
       
      </div>
       
      </>
        )}
   

      {Parsedresult?.cart?.cartItems.length !== 0 &&  <div className="sticky overflow-x-hidden bottom-0 z-[10] w-[400px]
       max-sm:w-[300px]  flex flex-col bg-white  right-0">
            <div className="flex justify-between p-4 bg-[#e3e3e3] ">
                 <p className="font-bold sm:text-base text-sm ">{Parsedresult?.cart?.cartItems.reduce((acc:any,item:any)=> acc + item.quantity, 0)} produits</p>
                  <div className="flex flex-col items-center">
                      <p className="font-bold sm:text-base text-sm">Sous-total du panier</p>
                      <p className="text-[#00afaa] font-semibold sm:text-[20px] text-[14px] ">
                         {Parsedresult?.cart?.cartItems.reduce((acc:any, pro:any)=> acc + pro.quantity * parseFloat(pro.price), 0).toFixed(2)} Dh
                      </p>
                  </div>
            </div>
            <Link className="flex items-center justify-center my-8" href='/cart'>
                 <button type="button" className="px-4 py-3 text-white font-bold bg-[#00afaa] hover:bg-blue-950 rounded-[20px] text-base  w-[200px]" >
                     Voir le panier
                 </button>
            </Link>
       </div>
       }
      
    </div>
  )
}

export default CartSide