'use client'
import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { Spinner } from "react-bootstrap"
interface props {
    user: any,
    userId: string
}

const EditUserForm = ({user, userId}:props) => {
    //const parsedUser = JSON.parse(user)
  
    const [name, setName] = useState( user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const [isAdmin, setIsAdmin] = useState( user?.isAdmin || false)
    const [editing, setEditing] = useState(false)
     
   
    const router = useRouter()
    const pathname = usePathname()
    const handleSubmit = async (e:FormEvent)=> {
        e.preventDefault()
        setEditing(true)
        try {
           const res = await fetch('/api/edituser', {
             cache: "no-cache",
             method: "PUT",
             body: JSON.stringify({
               path: pathname,
               userId,
               name,
               email,
               isAdmin
             })
           })
           if(res.ok) {
            setEditing(false)
            router.push('/admin/usersList')
            router.refresh()
           }
           
        } catch (error) {
           console.log(error)
         
        }finally {
          setEditing(false)
        }
   }
     
  return (
    <>
         <form className="flex flex-col" onSubmit={handleSubmit}>
              <label className="font-bold text-[14px] mb-1 " htmlFor="username">User name</label>
              <input className="outline-none mb-4 placeholder:text-sm border
             border-[#ddd] rounded-lg px-3  py-2 text-semibold text-[#4c4c4c] text-base " type="text" placeholder='enter user name'
               value={name} onChange={(e)=> setName(e.target.value)} />
               <label className="font-bold mb-1 text-[14px] " htmlFor="useremail">User Email</label>
              <input className="outline-none mb-4 placeholder:text-sm border
             border-[#ddd] rounded-lg px-3 py-2 text-semibold text-[#4c4c4c] text-base " type="email" placeholder='enter Email address'
               value={email} onChange={(e)=> setEmail(e.target.value)} />
                <div className="flex items-center gap-x-2">
                <input type="checkbox" checked={isAdmin === true} 
               value={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked) } />
                <p className="font-bold text-[18px] ">Admin user</p>
             
                </div>
               <button disabled={editing} className="w-full rounded-md bg-[#0aafaa] mt-4 text-white font-bold  px-4 py-2 " type="submit">
                   {editing ? <Spinner role='status' animation='border' style={{
                display:'block',
                width:'30px',
                height:'30px',
                margin:'auto',
                color:'#fff'
              }} >
                </Spinner>  : 'Valider'}
               </button>
           </form>
    </>
  )
}

export default EditUserForm