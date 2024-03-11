"use client"
import { deleteProduct } from '@/lib/actions/product.actions';
import { usePathname } from 'next/navigation';
import { Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useToast } from './ui/use-toast';
interface props {
    _id: string;
}
const BtnDelete = ({_id}:props) => {
  const  { toast } = useToast()
    const pathname = usePathname()
    const handleDelete = async()=> {
        try {
             await deleteProduct({
                 productId: _id,
                 path: pathname
             })
             return toast({
               title: "Product has been deleted successfuly"
             })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
      <Button onClick={handleDelete}  type='button' variant='light' className='btn-sm m-0'>
         <FaTrash color='red' />
      </Button>
    </>
  )
}

export default BtnDelete