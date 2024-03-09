import FormContainer from "@/components/FormContainer"
import EditUserForm from "@/components/forms/EditUserForm"

import { getAllUsers } from "@/lib/actions/user.actions"

import type { Metadata } from "next"
interface props {
  params: {
    id: string
  }
}
export const metadata: Metadata = {
  title: "Modify user by Admin sur marjanemall maroc",
};
const EditUserPage = async({params}:props) => {
   

   
  const users = await getAllUsers({})
  const user = users.users.find((user:any)=> user?._id.toString() === params.id)

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