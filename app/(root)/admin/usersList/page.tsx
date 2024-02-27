
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa"

import { Button, Table } from "react-bootstrap"
import Link from 'next/link'


const UsersList = () => {
   
   const users = [] as any

  return (
    <div className='products-list'>
    <div className='align-items-center m-4'>
       <h2   className="text-[#333] font-extrabold text-[30px] w-full mt-5 mb-3 mx-[30px] ">
           users List</h2>
           <div className="products-list mt-4">
               <div className="products-table">
                    <Table responsive bordered striped hover className='table-sm'>
                        <thead>
                            <tr>
                            <th className='text-center  whitespace-nowrap'>USER ID</th>
                    <th className='text-center whitespace-nowrap'>EMAIL</th>
                    <th className='text-center whitespace-nowrap'>NAME</th>
                    <th className='text-center whitespace-nowrap'>IS ADMIN</th>
                    <th className='text-center whitespace-nowrap'>EDIT</th>
                    <th className='text-center whitespace-nowrap'>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((product:any) => (
                               <tr key={product._id}>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                       {product._id}
                                    </td>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                      {product.name}
                                    </td>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                       {product.price}
                                    </td>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                       {product.brand}
                                    </td>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                       {product.category}
                                    </td>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                       {product.countInStock}
                                    </td>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                    <Link href={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm m-0'>
                                           <FaEdit color='green' />
                                        </Button>
                                    </Link>
                                   
                                    </td>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                      <Button   type='button' variant='light' className='btn-sm m-0'>
                                        <FaTrash color='red' />
                                      </Button>
                                     
                                    </td>
                               </tr>
                            ))}
                        </tbody>
                    </Table>
                  
               </div>
             
           </div>
    </div>
</div>
  )
}

export default UsersList