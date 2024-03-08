"use client"
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegHeart, FaShoppingBag, FaUser } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";

const ProfileMobileTabs = ({user}:any) => {

   const pathname = usePathname()
    const profileTabs = [
        { title: 'mon compte', url: `/profile/${user.user.clerkId}`, icon: <FaComputer size={40} />},
        { title: 'Historique commande', url: '/sales/history', icon:<FaShoppingBag size={40}  /> },
        { title: "Ma liste d'envie", url: "/browse-wishlist_products", icon: <FaRegHeart size={40}  /> },
        { title: "information du compte", url: "/customer/account/edit" , icon: <FaUser size={40} />},
        { title: "Carnet d'adresses", url: "/customer/address", icon: <FiMapPin size={40}  /> },
       // { title: "Deconnexion", url: null, icon:<IoLogOutOutline size={40}  /> },
      ];
   
  return (
    <div className="w-full overflow-x-scroll flex  gap-x-[60px] mt-2  lg:hidden px-4">
        {profileTabs.map((item,index)=> (
             <Link href={item.url} key={index} className="flex flex-col gap-1 items-center text-center ">
             <div className={`${pathname === item.url ? 'bg-[#0b4d54]' : "bg-[#ddd]"} md:w-[100px] md:h-[100px] w-[70px] h-[70px]
              flex items-center justify-center  rounded-full`}>
                  <div className={pathname === item.url ? 'text-white' : "text-[#0b4d54]"}>
                     {item.icon}
                  </div>
             </div>
             <p className="text-[12px] md:text-[15px] font-medium  mb-2 mt-1  !text-[#575757] ">{item.title} </p>
           </Link>
        ))}
        <SignOutButton>
         <div  className="flex flex-col gap-1 items-center text-center ">
             <div className={ "bg-[#ddd] md:w-[100px] md:h-[100px] w-[70px] h-[70px] flex items-center justify-center  rounded-full"}>
                  <div className={"text-[#0b4d54]"}>
                     <IoLogOutOutline size={40} />
                  </div>
             </div>
                  
               <p className="text-[12px] md:text-[15px] font-medium  mb-2 mt-1 !text-[#575757]  ">Deconnextion</p>       
           
            
           </div>
           </SignOutButton>
    </div>
  )
}

export default ProfileMobileTabs