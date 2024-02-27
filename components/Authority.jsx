import React from 'react';
import { BiLike } from 'react-icons/bi';
import { FaShippingFast } from 'react-icons/fa';
import { IoBook } from 'react-icons/io5';
import { VscWorkspaceTrusted } from 'react-icons/vsc';

const Authority = () => {
  return (
    <div className="lg:w-[450px] mt-10  w-[100%-50px]  mx-auto justify-between
    px-7 py-5 bg-[#0b4d54] rounded-[20px] flex lg:flex-col gap-[15px] ">

      <div className="flex lg:flex-row flex-col items-center space-x-5 gap-[20px]  space-y-3">
        <div className="lg:w-[45px] lg:h-[45px] w-[65px] h-[65px] rounded-full flex 
        items-center justify-center bg-[#00afaa]">
          <BiLike color="white" size={30} />
        </div>
        <p className="text-white font-medium text-[16px] text-center">
          Satisfait ou<br className="lg:hidden block" />remboursé
        </p>
      </div>

      <div className="flex lg:flex-row flex-col items-center gap-[20px] space-x-5 space-y-3">
        <div className="lg:w-[45px] lg:h-[45px] w-[65px] h-[65px] rounded-full flex items-center justify-center bg-[#00afaa]">
          <FaShippingFast color="white" size={30} />
        </div>
        <p className="text-white font-medium text-[16px] text-center">
          Livraison partout<br className="lg:hidden block" />au Maroc
        </p>
      </div>

      <div className="lg:flex hidden items-center gap-[20px] space-x-5 space-y-3 ">
        <div className="lg:w-[45px] lg:h-[45px] w-[65px] h-[65px] rounded-full flex items-center justify-center bg-[#00afaa]">
          <VscWorkspaceTrusted color="white" size={30} />
        </div>
        <p className="text-white font-medium text-[16px]">
          Produits 100% authentiques
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-[20px] items-center space-x-5 space-y-3">
        <div className="lg:w-[45px] lg:h-[45px] w-[65px] h-[65px] rounded-full flex items-center justify-center bg-[#00afaa]">
          <IoBook color="white" size={30} />
        </div>
        <p className="text-white font-medium text-[16px] text-center">
          Offre nationale<br className="lg:hidden block" />et internationale
        </p>
      </div>

    </div>
  );
}

export default Authority;
