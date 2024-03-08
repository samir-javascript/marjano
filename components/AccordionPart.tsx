import Image from 'next/image'



const AccordionPart = () => {
  return (
    <ul className='flex-1 lg:mt-0 mt-8'>
                 
                  <div className='flex lg:flex-col space-y-8 flex-wrap lg:gap-x-0 gap-x-4'>
                  <h2 className='font-semibold text-[16px] mb-3 capitalize lg:block hidden '>Nos engagements</h2>
                  <li className='flex items-center gap-x-[40px] '>
                      <div className='flex items-center space-x-2'>
                           <Image  width={45} height={30}  className='w-[45px] h-auto object-contain ' src={'/images/badge1.png'} alt="icon" />
                           <div className='flex flex-col gap-1'>
                              <p className='font-semibold text-slate-50 text-sm '>Produits 100%</p>
                              <p className='font-semibold text-slate-50 text-sm ' >authentiques</p>
                            </div>
                      </div>
                      <div className='flex items-center  space-x-2'>
                           <Image width={45} height={30} className='w-[45px] h-auto object-contain ' src={"/images/badge3.png"} alt="" />
                           <div className='flex flex-col gap-1'>
                              <p className='font-semibold text-slate-50 text-sm '>Livraison partout</p>
                              <p className='font-semibold text-slate-50 text-sm '>au Maroc</p>
                            </div>
                      </div>
                  </li>
                  <li className='flex items-center gap-x-[40px]  '>
                      <div className='flex items-center space-x-2'>
                           <Image width={45} height={30}  className='w-[45px] h-auto object-contain ' src={'/images/badge2.png'} alt="" />
                           <div className='flex flex-col gap-1'>
                              <p className='font-semibold text-slate-50 text-sm '>Satisfait ou</p>
                              <p className='font-semibold text-slate-50 text-sm ' >emboursé</p>
                            </div>
                      </div>
                      <div className='flex items-center  space-x-2'>
                           <Image width={45} height={30} className='w-[45px] h-auto object-contain ' src={'/images/badge4.png'} alt="" />
                           <div className='flex flex-col gap-1'>
                              <p className='font-semibold text-slate-50 text-sm '>Offre nationale et</p>
                              <p className='font-semibold text-slate-50 text-sm '>internationale</p>
                            </div>
                      </div>
                  </li>
                  <li className='flex lg:flex-col flex-wrap lg:items-start items-center lg:space-x-0 space-x-12 '>
                  <h2 className='font-semibold text-[16px] text-slate-50 mb-3 capitalize '>Modes de paiement</h2>
                  <Image width={100} height={100} className='w-[320px] object-contain ' src={'/images/paiement_x2_1.webp'} alt="" />
                  </li>
                  </div>
                  
             </ul>
  )
}

export default AccordionPart