"use client"
import  { useEffect } from 'react';
import  Link from 'next/link'
import './styles.css'
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '@/utils/confetii'




const ThankYou = () => {
 
  
  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
         
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2 className='sm:!text-[30px] !text-[20px] text-center '>Thank you for your order!</h2>
        <p className="email-msg">Your order is being proccesed.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
           marjanemall@supporte.com
          </a>
        </p>
        <div className='btn-tnk mt-3' >
        <Link style={{textDecoration:'none'}} href='/'>
                 <button className='px-3 py-2 rounded-md  bg-[#0aafaa] text-white border-none'>
                    Home Page
                 </button>
                 </Link>
                 <Link href='/sales/history'>
                 <button className='not-btn px-3 py-2 rounded-md bg-[#0aafaa] text-white border border-[#0aafaa]  '>
                     voir vos commandes
                 </button>
                 </Link>
          
        </div>
      </div>
    </div>
  )
}

export default ThankYou