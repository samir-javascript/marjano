import { Image } from "react-bootstrap"

const Loader = () => {
  return (
    <div className="fixed h-full w-full top-0 left-0 bottom-0 right-0 inset-0 bg-[rgba(255,255,255,0.9)] flex items-center justify-center z-99999 ">
    <div className="flex flex-col h-full z-[99999] w-full mt-[140px] items-center gap-8 text-center">
          <Image   src="/images/loader-2.gif" alt="loading..." className='w-[250px] z-[9999] h-[250px] object-contain ' />
    </div>
</div>
  )
}

export default Loader
/*
<Spinner role='status' animation='border' style={{
            display:'block',
            width:'70px',
            height:'70px',
            margin:'auto',
            color:'#00afaa'
          }} >
            </Spinner> */