'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <html>
       <body>
       <div className='h-full w-full flex flex-col items-center pt-20 justify-center text-center'>
      <h2 className='sm:text-[30px] text-[22px] text-black font-medium mb-1 '>Something went wrong!</h2>
      <button
      className='outline-none border-none px-4 py-2.5 rounded-[20px] text-white bg-[#00affa] 
            text-sm font-bold
      '
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
       </body>
    </html>
   
  )
}