


import ProfileMobileTabs from "@/components/ProfileMobileTabs";
import ProfileTable from "@/components/ProfileTable";
import UserForm from "@/components/forms/UserForm";
import { getUserById } from "@/lib/actions/cart.actions";
import { auth } from "@clerk/nextjs";
const EditProfile = async() => {

    const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
  console.log('USER HERE', user)
  return (
    <div className="w-full h-full bg-slate-50">
      <div className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 lg:py-5">
        <ProfileTable />
        <ProfileMobileTabs user={user} />
        <UserForm  user={JSON.stringify(user)} />
       
      </div>
    </div>
  );
  
}

export default EditProfile