"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Rating from "../Rating"
import { useRouter, useSearchParams } from "next/navigation"
import { formUrlQuery, removeKeysFromQuery } from "@/utils/constants"
import { filterCategories } from "@/utils/constants"
const CategoryFilter = () => {
  const searchParams = useSearchParams()
 
  const router = useRouter()
  const paramFilter = searchParams.get('filter')
   const handleUpdateFilter = (value:string)=> {
      const newUrl = formUrlQuery({
         params: searchParams.toString(),
         key:'filter',
         value:  value.toLowerCase()
      })
      router.push(newUrl, {scroll: false})
   }
   
 
  return (
    <div className={` relative`}>
      
    <Select onValueChange={handleUpdateFilter} defaultValue={paramFilter || undefined} >
      <SelectTrigger
        className={` body-regular bg-[#F4F6F8] !border-none !outline-none
          lg:w-full px-5 py-2.5 text-black
      `}
      >
        <div className="flex-1 font-semibold capitalize  text-left line-clamp-1 ">
         
          <SelectValue className="!font-semibold  !capitalize" placeholder={"categories"} />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-[#fff] text-[#000] border-none outline-none">
        <SelectGroup>
          {filterCategories?.map((filter:any) => (
            <SelectItem 
             
            className="focus:bg-[#F4F6F8] hover:bg-[#F4F6F8] cursor-pointer" 
             key={filter.value} value={filter.value}>
                {filter.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  )
}

export default CategoryFilter