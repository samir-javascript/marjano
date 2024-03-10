import Link from "next/link"


const BtnVoitToutes = () => {
  return (
    <Link className="w-full my-3 flex justify-center items-center" href='/marjanemall_Products_list'>
       <button type="button"  className="px-5   w-[300px] flex items-center justify-center whitespace-nowrap py-2
         rounded-[20px] bg-[#00afaa] transition-all duration-300 ease-in-out hover:bg-transparent hover:!text-[#00afaa] text-[14px] font-bold border !border-[#00afaa] outline-none hover:!underline text-white ">
            Voir tous les produits
       </button>
    </Link>
  )
}

export default BtnVoitToutes

