import ThankYou from "@/components/thankYouScreen/ThankYou"
import type { Metadata } from "next";
export const metadata: Metadata = {
   title: "Thank you for choosing us | Marjanemall maroc",
 };
const Page = () => {
 
  return (
     <div>
        <ThankYou />
     </div>
  )
}

export default Page