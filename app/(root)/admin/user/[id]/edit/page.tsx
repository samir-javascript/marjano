import FormContainer from "@/components/FormContainer"
import EditUserForm from "@/components/forms/EditUserForm"
import { getUserById } from "@/lib/actions/cart.actions"
import { auth } from "@clerk/nextjs"
import type { Metadata } from "next"
interface props {
  params: {
    id: string
  }
}
export const metadata: Metadata = {
  title: "Modifier l'adresse",
};
const EditUserPage = async({params}:props) => {
   
   const { userId } = auth()
   const user  = await getUserById({clerkId:userId!})
    
  return (
    <div className="py-5">

    
    <FormContainer>
           <h2   className="text-[#333] font-extrabold text-[30px] w-full mt-5 mb-3  ">
           Edit user</h2>
        <EditUserForm userId={params.id}  user={user} />
    </FormContainer>
    </div>
  )
}

export default EditUserPage