"use client"

import { createShippingAddress } from "@/lib/actions/shipping.actions";
import { countryOptions } from "@/utils/constants";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react"
import Select, { SingleValue } from 'react-select';
import { useToast } from "../ui/use-toast";
const ShippingForm = ({user, shipping,type}:any) => {
  const parsedUser = JSON.parse(user)
  const parsedShipping = JSON.parse(shipping) 
    const [phoneNumber, setPhoneNumber] = useState(parsedShipping?.phoneNumber ||  "")
    const [city, setCity] = useState(parsedShipping?.city || '')
    const [country, setCountry] = useState(parsedShipping?.country || '')
    const [postalCode, setPostalCode] = useState(parsedShipping?.postalCode || "")
    const [address, setAddress] = useState(parsedShipping?.address || '')
    const [loading,setLoading] = useState(false)
    const {toast} = useToast()
     const pathname = usePathname()
     const router = useRouter()
    
    
    const handleCountryChange = (selectedOption: SingleValue<{ value: string; label: string; } | null>) => {
      // Check if selectedOption is null, and set the country accordingly
      setCountry(selectedOption ? selectedOption.label : '');
    };
      const handleSubmit = async(e:any)=> {
         e.preventDefault()
         setLoading(true)
        try {
           await createShippingAddress({
              user: parsedUser.user._id,
              path: pathname,
              city,
              postalCode,
              address,
              country,
              phoneNumber
           })
           if(type === "addition")  {
              router.push(`/profile/${parsedUser.user.clerkId}`)
           }else {
            router.push('/payment')
           }
           return toast({
            title: "Your shipping address has been created",
          })
        } catch (error) {
            console.log(error)
        }
      }
     
  return (
    <>
       <form onSubmit={handleSubmit}  className="flex flex-col gap-2 mt-5 w-full">
         
         <label className="font-bold text-[14px] " htmlFor="phone-number">
            Phone Number
         </label>
         <input
          value={phoneNumber}
          onChange={(e)=> setPhoneNumber(e.target.value)}
           className="outline-none placeholder:text-sm border mb-2 text-semibold text-[#4c4c4c] text-base border-[#ddd] rounded-lg px-3 py-2 "
           type="number"
           required
           placeholder="Enter your phone number"
         />
         <label className="font-bold text-[14px] ">
             address
         </label>
         <input
          value={address}
          onChange={(e)=> setAddress(e.target.value)}
           className="outline-none placeholder:text-sm mb-2 border text-semibold text-[#4c4c4c] text-base border-[#ddd] rounded-lg px-3 py-2 "
           type="text"
           required
           placeholder="street address or P.O.Box"
         />
         <label className="font-bold text-[14px] " htmlFor="city">
           City
         </label>
         <input
          
           className="outline-none text-semibold text-[#4c4c4c] text-base placeholder:text-sm border mb-2 border-[#ddd] rounded-lg px-3 py-2 "
           type="text"
           value={city} 
           required
           onChange={(e)=> setCity(e.target.value) }
           placeholder=""
         />
         <label className="font-bold text-[14px] " htmlFor="postal-code">
           Postal code
         </label>
         <input
          
           className="outline-none text-semibold
            text-[#4c4c4c] text-base placeholder:text-sm border
             mb-2 border-[#ddd] rounded-lg px-3 py-2 "
           type="text"
           required
           onChange={(e)=>setPostalCode(e.target.value)}
           value={postalCode}
           placeholder=""
         />
         
         <label className="font-bold text-[14px] mt-2 " htmlFor="country">
          Country
         </label>
          
         <Select
  required
  options={countryOptions}
  onChange={(selectedOption, actionMeta) => handleCountryChange(selectedOption)}
  placeholder="Select a country"
/>
        
         <button
          
           type="submit"
           disabled={loading}
           className="bg-[#00afaa] mt-3  text-white font-bold w-[250px] h-[40px] rounded-[20px] "
         >
            {loading ? "loading..." : "valider"}  
         </button>
       </form>
    </>
  )
}

export default ShippingForm