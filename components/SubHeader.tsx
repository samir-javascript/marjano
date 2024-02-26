/* eslint-disable react/no-unescaped-entities */
import React from 'react'

const SubHeader = () => {
  return (
    <header className='flex justify-center items-center text-center p-2 gap-2 bg-[#0a2427] '>
       <p className='font-medium text-[#d5c483] text-[14px] p-0 m-0 '>Livraison gratuite à partir de 400 dhs</p>
       <p className='sm:block hidden text-white text-[14px] p-0 m-0 font-medium '>*Hors produits expédiés depuis l'étranger</p>
    </header>
  )
}

export default SubHeader