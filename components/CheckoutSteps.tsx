"use client"

import { useRouter } from 'next/navigation';
import { Nav } from 'react-bootstrap'

import {  FaCheck} from 'react-icons/fa'
interface Props {
   step1?: boolean;
   step2?: boolean;
   step3?: boolean;
   step4?: boolean;
}
const CheckoutSteps = ({step1 , step2 , step3 , step4}:Props) => {
 
   const router = useRouter()
  return (
    <Nav className='justify-content-center my-4 bg-transparent '>
         <Nav.Item className='flex items-center'>
           
            {step1 ? (
                <div onClick={()=> router.push('/cart')}>
                     <Nav.Link >
                      <div className=' flex flex-col items-center text-center gap-[2px]  '>
                        <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#00afaa]  '>
                           <FaCheck  size={12} color='#fff' />
                        </div>
                          
                          <p className='font-bold text-[#00afaa] text-sm'>panier</p>
                      </div>
                   </Nav.Link>
                  
                </div>
            ): (
                <>
                <Nav.Link  disabled>
                <div className=' flex flex-col items-center text-center gap-[2px]'>
                        <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#ddd]  '/>
                          
                      
                          
                          <p className='font-bold text-gray-500 text-sm '>panier</p>
                      </div>
               </Nav.Link>
                
                </>
            )}
             <div className=' border-dashed 
              border-[1px] lg:border-[#ddd] border-[#333]  w-[70px] sm:inline-block hidden ' />
         </Nav.Item>
         <Nav.Item className='flex items-center'>
            {step2 ? (
                <div  onClick={()=> router.push('/shipping')}>
                    <Nav.Link >
                    <div className=' flex flex-col items-center text-center gap-[2px]'>
                        <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#00afaa]  '>
                           <FaCheck  size={12} color='#fff' />
                        </div>
                          
                          <p className='font-bold text-[#00afaa] text-sm '>address de livraison</p>
                      </div>
                    </Nav.Link>
                </div>
            ): (
                <Nav.Link  disabled>
                   <div className=' flex flex-col items-center text-center gap-[2px]'>
                        <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#ddd]  '/>
                          
                      
                          
                          <p className='font-bold text-[#ddd] text-sm '>address de livraison</p>
                      </div>
               </Nav.Link>
            )}
             <div className=' border-dashed  border-[1px] lg:border-[#ddd] border-[#333] w-[70px] hidden sm:inline-block ' />
         </Nav.Item>
         <Nav.Item className='flex items-center'>
            {step3 ? (
                <div  onClick={()=> router.push('/payment')}>
                    <Nav.Link >
                    <div className=' flex flex-col items-center text-center gap-[2px]'>
                        <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#00afaa]  '>
                           <FaCheck  size={12} color='#fff' />
                        </div>
                          
                          <p className='font-bold text-[#00afaa] text-sm '>payment</p>
                      </div>
                    </Nav.Link>
                </div>
            ): (
                <Nav.Link  disabled>
                  <div className=' flex flex-col items-center text-center gap-[2px]'>
                        <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#ddd]  '/>
                          
                      
                          
                          <p className='font-bold text-[#ddd] text-sm '>payment</p>
                      </div>
               </Nav.Link>
            )}
             <div className=' border-dashed  border-[1px] lg:border-[#ddd] border-[#333] w-[70px] sm:inline-block hidden ' />
         </Nav.Item>
         <Nav.Item>
            {step4 ? (
                <div  onClick={()=> router.push('/place-order')}>
                    <Nav.Link >
                    <div className=' flex flex-col items-center text-center gap-[2px]'>
                        <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#00afaa]  '>
                           <FaCheck  size={12} color='#fff' />
                        </div>
                          
                          <p className='font-bold text-[#00afaa] text-sm '>place order</p>
                      </div>
                    </Nav.Link>
                </div>
            ): (
                <Nav.Link disabled>
                   <div className=' flex flex-col items-center text-center gap-[2px]'>
                        <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#ddd]  '/>
                          
                      
                          
                          <p className='font-bold text-[#ddd] text-sm '>place order</p>
                      </div>
               </Nav.Link>
            )}
         </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps