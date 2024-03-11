"use client"
import Image from "next/image"
import Link from "next/link"
import Input from "./Input"
import { FaRegHeart, FaUser } from "react-icons/fa";
import { SignedIn, UserButton } from "@clerk/nextjs";
import CartIcon from "./CartIcon";
import AdminDropDown from "./AdminDropDown";
import MobileHeader from "./MobileHeader";
import MegaMenu from "./Drawer/MegaMenu";
import { usePathname } from "next/navigation";


const Header =({qty,user}:any) => {
  
const words = user.user?.name.split(' ') || []


// Get the first character of each word
const initials = user &&  words.map((word:any) => word.charAt(0));

// Concatenate the initials into a string
const result = user && initials.join('').toUpperCase();
   const pathname = usePathname()
    if(pathname === '/payment' || pathname.startsWith('/orders')) return null;

  return (
    <>

    <header className="w-full h-[80px] bg-[#0b4d54] sticky top-0 left-0 hidden lg:block z-[999] ">
         <div className="flex items-center justify-between h-full max-w-[1400px] mx-auto ">
            <Link href='/'>
               <Image priority width={250} height={100} alt='marjanemall maroc '
                className="object-contain ml-[20px] mr-[55px] "
                 src={'https://www.marjanemall.ma/static/version1706188772/frontend/Marjane/default/fr_FR/images/marjane-logo.svg'} />
            </Link>
             <Input />
            <div className="flex items-center gap-x-6 ml-8 mr-4 ">
            {user && user?.user?.isAdmin && (
              <AdminDropDown />   
          )}
                
                 <Link href={'/browse-wishlist_products'} 
             className="flex no-underline flex-col items-center !text-white
              gap-1 cursor-pointer transition-all duration-150 hover:!text-[#80d4dd]">
                <div className="relative">
                   <FaRegHeart size={24} />
                   {user && user?.user?.saved?.length > 0 && (
                      <div className="absolute top-[0px] right-[-4px] bg-yellow-500
                       rounded-full w-[8px] h-[8px] flex justify-center items-center" />
                   )}
                </div>
               
                <p className="text-base font-normal whitespace-nowrap">Mon favoris</p>
            </Link>
                 <Link href={`/profile/${user?.user?.clerkId}`} 
             className="flex no-underline flex-col items-center !text-white
              gap-1 cursor-pointer transition-all duration-150 hover:!text-[#80d4dd]">
                <div className="relative">
                   <FaUser size={24} />
                   {user && (
                      <div className="absolute top-[-10px] right-[-10px] bg-yellow-500
                          rounded-full w-[20px] h-[20px] flex justify-center items-center">
                          <span className="text-[10px] text-blue-900 font-extrabold">{result} </span>
                     </div>
                   )}
                </div>
               
                <p>Mon compte</p>
            </Link>
                 
             <CartIcon  qty={user ? qty : 0} />

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
    <MobileHeader user={user} result={result} qty={qty} />
    <div>
       <MegaMenu />
    </div>
    </>
  )
}

export default Header