import React from 'react';
import { Image } from 'react-bootstrap';

const PageLoading = () => {
  return (
    <div className="fixed inset-0 w-full min-h-screen bg-[rgba(0,0,0,0.42)] flex items-center justify-center z-999">
         <div className="flex flex-col items-center justify-center gap-8 text-center w-full h-full">
              <Image className='w-[380px] z-[9999] h-[250px] object-contain' 
              src="/images/loader-2.gif" alt="loading..." fluid />
         </div>
    </div>
  );
};

export default PageLoading;
