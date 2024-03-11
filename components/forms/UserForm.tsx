"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

import Spinner from 'react-bootstrap/Spinner'
import { editUserProfile } from '@/lib/actions/user.actions'
import { useToast } from '../ui/use-toast'
const UserForm = ({user}:any) => {
  const parsedUser = JSON.parse(user);

  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  // Initialize state with user data
  const [email, setEmail] = useState(parsedUser?.user?.email || '');
  const [name, setName] = useState(parsedUser?.user?.name || '');
  const [username, setUsername] = useState(parsedUser?.user?.username || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkedForPassword, setCheckedForPassword] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await editUserProfile({
        userId: parsedUser.user._id,
        path: pathname,
        email,
        name,
        username,
       
      });
      router.push(`/profile/${parsedUser.user.clerkId}`)

      setIsLoading(false);
      return toast({
        title: "Your info had been updated",
      })
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

 
  return (
    <>
         <form onSubmit={handleSubmit} className="flex lg:flex-row  lg:mx-auto mx-3 lg:space-y-0 space-y-3 flex-col flex-1 w-full">
        <div className={`${checkedForPassword ? 'flex-1' :' lg:w-[60%] '} flex flex-col  mr-10`}>
            <h2 className="font-extrabold text-[#222332] text-[20px]  whitespace-nowrap mb-2">Informations du compte</h2>
           
               
                      <div className="mb-3">
                          <label className="font-normal ml-8 text-[#0aafaa] text-sm"
                           htmlFor="name">Nom</label>
                          <div className="border-b border-gray-500 flex
                           items-center relative ">
                               <FaUser color='#2c7c7a' />
                               <input onChange={(e)=> setName(e.target.value)}
                                value={name} className="ml-4 w-full bg-transparent
                                 text-base font-medium outline-none border-none
                                  placeholder:text-gray-400 placeholder:font-normal
                                   placeholder:text-sm" type="text" placeholder="Nom"  />
                          </div>
                      </div>
                      <div className='mb-3'>
                          <label className="font-normal ml-8 text-[#0aafaa] text-sm"
                           htmlFor="email">Address email</label>
                          <div className="border-b border-gray-500 flex items-center
                           relative ">
                               <MdEmail  color='#2c7c7a'/> 
                               <input  onChange={(e)=> setEmail(e.target.value)} 
                               value={email} 
                               
                         className="ml-4 w-full bg-transparent text-base
                          font-medium outline-none border-none
                           placeholder:text-gray-400 placeholder:font-normal
                            placeholder:text-sm" type="email" placeholder="Email address"  />
                          </div>
                      </div>
                      <div>
                          <label className="font-normal ml-8 text-[#0aafaa] text-sm"
                           htmlFor="username">User name</label>
                          <div className="border-b border-gray-500 flex items-center
                           relative ">
                               <FaUser  color='#2c7c7a'/> 
                               <input onChange={(e) => {
    console.log('Input changed:', e.target.value);
    setUsername(e.target.value);
  }}
                               value={username} 
                               
                         className="ml-4 w-full bg-transparent text-base
                          font-medium outline-none border-none
                           placeholder:text-gray-400 placeholder:font-normal
                            placeholder:text-sm" type="text" placeholder="Full name"  />
                          </div>
                      </div>
                        
                          <div className=" flex gap-x-2 items-center relative mt-4">
                          <input
                  type="checkbox"
                  className='outline-none border-none'
                  checked={checkedForPassword}
                  onChange={(e) =>
                    setCheckedForPassword((prev) => !prev)
                  }
                />
                              <p className="font-medium text-base ml-4 whitespace-nowrap">Modifier le mot de passe</p>
                          </div>
                    
                      <button disabled={isLoading} className="w-fit lg:flex hidden py-2 px-4 rounded-[20px] mt-3 bg-[#0aafaa] text-white font-bold text-base transition-all duration-150 hover:bg-[#267774] ">
                         {isLoading ? (
                          <div className="
                          rounded-[8px]   text-white font-bold  bg-[#00afaa] flex items-center justify-center  w-[100px] h-[30px]  ">
                               <Spinner role='status' animation='border' style={{
                             display:'flex ',
                             alignItems:'center',
                             justifyContent:'center',
                             width:'30px',
                             height:'30px',
                             margin:'auto',
                             color:'#fff'
                           }} >
                             </Spinner>
                            </div>
                         ) : ' Enregistrer'} 
                      </button>
           
        </div>
        {/* second col */}
        {checkedForPassword && (
 <div className="flex-1 flex flex-col lg:mr-4 mr-10  ">
 <h2 className="font-extrabold text-[#222332] text-[20px]
  !whitespace-nowrap lg:mt-0 mt-3  mb-2">Modifier le mot de passe</h2>
             <div>
                  
                   <div className="border-b  border-gray-500 flex items-center relative ">
                        <RiLockPasswordFill size={32} color='#2c7c7a'/> 
                        <input value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} className="ml-4 w-full bg-transparent text-base font-medium outline-none border-none placeholder:text-gray-400 placeholder:font-normal placeholder:text-sm" 
                        type="password" placeholder="Nouveau mode de pass"  />
                   </div>
                   <div className="border-b mt-4 border-gray-500 flex items-center relative ">
                        <RiLockPasswordFill size={32} color='#2c7c7a'/> 
                        <input value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} className="ml-4 w-full bg-transparent text-base font-medium outline-none border-none placeholder:text-gray-400 placeholder:font-normal placeholder:text-sm" 
                        type="password" placeholder="confirm Nouveau mode de pass"  />
                   </div>
               </div>
 </div>
        )}
         <button disabled={isLoading} className={`${isLoading ? '' : ''}w-fit lg:hidden flex  py-2 px-4 rounded-[20px]
          my-3 bg-[#0aafaa] text-white font-bold text-base `}>
                         {isLoading ? (
                          
                               <Spinner role='status' animation='border' style={{
                             display:'flex ',
                             alignItems:'center',
                             justifyContent:'center',
                             width:'30px',
                             height:'30px',
                             margin:'auto',
                             color:'#fff'
                           }} >
                             </Spinner>
                           
                         ) : ' Enregistrer'} 
                      </button>
        </form>
    </>
  )
}

export default UserForm