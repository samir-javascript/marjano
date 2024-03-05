
import Image from "next/image"
import Link from "next/link"
import Input from "./Input"
import { FaRegHeart, FaUser } from "react-icons/fa";
import { SignedIn, UserButton, auth } from "@clerk/nextjs";
import { getCartTotalCount, getUserById, getUserCart } from "@/lib/actions/cart.actions";
import CartIcon from "./CartIcon";

import AdminDropDown from "./AdminDropDown";
import MobileHeader from "./MobileHeader";
import MegaMenu from "./Drawer/MegaMenu";


const Header = async() => {
    
     const { userId } = auth()
    
     const user = await getUserById({clerkId:userId!})
    
      const qty = await getCartTotalCount({
        userId: user?.user?._id
      })
     
  return (
    <>

    <header className="w-full h-[80px] bg-[#0b4d54] sticky top-0 left-0 hidden lg:block z-[999] ">
         <div className="flex items-center justify-between h-full max-w-[1400px] mx-auto ">
            <Link href='/'>
               <Image priority width={250} height={100} alt='marjanemall maroc ' className="object-contain ml-[20px] mr-[55px] " src={'https://www.marjanemall.ma/static/version1706188772/frontend/Marjane/default/fr_FR/images/marjane-logo.svg'} />
            </Link>
             <Input />
            <div className="flex items-center gap-x-6 ml-8 mr-4 ">
            {user && user?.user?.isAdmin && (
              <AdminDropDown />   
          )}
                 <Link href='/browse-wishlist_products' className="flex no-underline  flex-col text-center transition-all gap-1 duration-200 hover:!text-[#80d4dd] cursor-pointer items-center text-white">
                     <FaRegHeart size={25} />
                     <p>Mon favoris </p>
                 </Link>
                 <Link href={`/profile/${userId}`} className="flex text-white no-underline gap-1 transition-all duration-200 hover:!text-[#80d4dd] flex-col text-center items-center cursor-pointer">
                    <FaUser size={25} />
                    <p>Mon Compte</p>
                 </Link>
             <CartIcon  qty={userId ? qty : 0} />

                 <SignedIn>
                   <UserButton 
                    appearance={{
                        elements: {
                            avatarBox: 'h-10 w-10'
                        }, 
                        variables: {
                            colorPrimary: '#ff7000'
                        }
                    }}
                   afterSignOutUrl="/"/>
                 </SignedIn>
            </div>
         </div>
    </header>
    <MobileHeader qty={qty} />
    <div>
       <MegaMenu />
    </div>
    </>
  )
}

export default Header