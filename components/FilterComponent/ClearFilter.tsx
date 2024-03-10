"use client"

import { removeKeysFromQuery } from "@/utils/constants"
import { useRouter, useSearchParams } from "next/navigation"
import { FaTimes } from "react-icons/fa"

const ClearFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handleClearFilter = ()=> {
        const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['page', 'filter','filterRating']
          })
          router.push(newUrl, {scroll: false})
    }
  return (
    <button onClick={handleClearFilter} className="border-none  w-fit flex items-center justify-center gap-4 outline-none
     text-white bg-[#d70073] p-1.5 rounded-[15px] " type="button">
          <p className="text-sm font-bold p-0 m-0 indent-2">Réinitialiser</p>
          <FaTimes size={13} color="#c5c5c5" />
    </button>
  )
}

export default ClearFilter