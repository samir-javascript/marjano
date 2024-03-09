
import React from 'react'
import { Image } from 'react-bootstrap'

const PageLoading = () => {
  return (
    <div className="fixed h-full w-full top-0 left-0 bottom-0 right-0 inset-0 bg-[rgba(0,0,0,0.1)] flex items-center justify-center z-99999 ">
    <div className="flex flex-col h-full z-[99999] w-full mt-[140px] items-center gap-8 text-center">
          <Image   src="/images/loader-2.gif" alt="loading..." className='w-[350px] z-[9999] h-[250px] object-contain ' />
    </div>
</div>
  )
}

export default PageLoading