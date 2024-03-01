"use client"
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileTable = () => {
  const { userId } = useAuth()
  const pathname = usePathname()
  
    const profileTabs = [
        { title: 'mon compte', url: `/profile/${userId}` },
        { title: 'Historique des commandes', url: '/sales/history' },
        { title: "Ma liste d'envie", url: "/browse-wishlist_products" },
        { title: "information du compte", url: "/customer/account/edit" },
        { title: "Carnet d'adresses", url: "/customer/address" },
       
      ];
      
  return (
    <div className="w-[300px] h-auto lg:block hidden  rounded-[15px] mx-[10px] ">
    <ul className='flex flex-col cursor-pointer'>
      {profileTabs.map((item, index) => (
        <Link key={index} href={item.url} >
        <li
          className={`${pathname.startsWith(item.url) ? "bg-[#00afaa] text-white font-extrabold" : ""}
           ${index === 0 ? 'rounded-tr-[20px] rounded-tl-[20px] ' : ''} border border-[#ddd] transition-all
            duration-150 ease-in-out p-4 ${
            pathname.startsWith(item.url) ? "" : "hover:bg-[rgb(173,216,230)]"
          }`}
         
        >
          <Link className={pathname.startsWith(item.url) ? 
            ' text-white' : 'text-[#575757] tracking-normal font-bold'} href={item.url}>
            {item.title}
          </Link>
        </li>
        
        </Link>
      ))}
      <li className=" border border-[#ddd] rounded-br-[20px] rounded-bl-[20px] transition-all duration-150 ease-in-out p-4 
             hover:bg-[rgb(173,216,230)]"
          >
             <button  type="button" className={ 'text-[#575757] font-bold'}>
                Deconnextion
             </button>
        </li>
    </ul>
  </div>
  )
}

export default ProfileTable