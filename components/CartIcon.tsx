"use client"

import { MdOutlineShoppingCart } from 'react-icons/md'

interface Props {
  qty: number;
}
const CartIcon = ({qty}:Props) => {
  const navtoggle = () => {
        console.log('I WAS CLICKED')

    const menu = document.getElementById('menu-cart');
  
    menu?.classList.toggle('show-menu');
    document.body.classList.add('stop-scrolling');
    console.log('I WAS CLICKED AGAIN')
    // Add click event listener to the body
  
  };
  return (
    <div onClick={navtoggle}  id='cartSlide-btn'
    className="flex  flex-col !text-white items-center gap-1 cursor-pointer
     transition-all duration-150 hover:!text-[#80d4dd]">
       <div className="relative">
         <MdOutlineShoppingCart size={26} />
        {qty !== 0 && (
          <div className="absolute top-[-10px] flex items-center justify-center rounded-full right-[-10px]  text-[12px] bg-yellow-500 w-[20px] h-[20px] ">
           <span className="text-[#0b4d54] font-semibold">
              {qty}
           </span>

     </div>
        )}
        
      </div>
      
      <p className="text-base font-normal whitespace-nowrap">Mon panier</p>
  </div>
  )
}

export default CartIcon