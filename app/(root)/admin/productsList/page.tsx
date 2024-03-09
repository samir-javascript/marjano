import Btn from "@/components/Btn";
import BtnDelete from "@/components/BtnDelete";
import PaginateCategories from "@/components/Paginate";
import { getUserById } from "@/lib/actions/cart.actions";
import { getProducts } from "@/lib/actions/product.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa";
interface props {
   searchParams: {
      page: number;
   }
}
const ProductsList = async({searchParams}:props) => {
  
   
  
  
  const truncate = (string:string, n:number) => {
    return string.length > n ? string.substring(0, n) + '...' : string;
  };
  const result = await getProducts({page: searchParams.page ? +searchParams.page : 1 })
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
  return (
    <div className='products-list'>
       <Row className='align-items-center m-4'>
          <Col>
          <h2 className="text-[#333] font-extrabold sm:text-[30px] 
          text-[20px]  sm:mx-[20px] mx-[10px] ">Products List</h2>
          </Col>
          <Col className='text-end'>
            <Btn user={JSON.stringify(user)} />
          </Col>
           <div className="products-list mt-4">
               <div className="products-table">
                    <Table responsive bordered striped hover className='table-sm'>
                        <thead>
                            <tr>
                                <th className='text-center  text-[16px] font-bold text-[#333] whitespace-nowrap ' >PRODUCT ID</th>
                                <th className='text-center text-[16px] font-bold text-[#333] whitespace-nowrap'>NAME</th>
                                <th className='text-center text-[16px] font-bold text-[#333] whitespace-nowrap'>PRICE</th>
                                <th className='text-center text-[16px] font-bold text-[#333] whitespace-nowrap'>BRAND</th>
                                <th className='text-center text-[16px] font-bold text-[#333] whitespace-nowrap'>CATEGORY</th>
                                <th className='text-center text-[16px] font-bold text-[#333] whitespace-nowrap'>QTY</th>
                                <th className='text-center text-[16px] font-bold text-[#333] whitespace-nowrap'>EDIT</th>
                                <th className='text-center text-[16px] font-bold text-[#333] whitespace-nowrap'>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.products.map((product:any) => (
                               <tr key={product._id}>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                       {product._id}
                                    </td>
                                    <td className='text-center text-[14px] text-gray-500 font-medium whitespace-nowrap'>
                                       {truncate( product.name,60)}
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
                                      <BtnDelete _id={product._id} />
                                     
                                    </td>
                               </tr>
                            ))}
                        </tbody>
                    </Table>
                  
               </div>
             
           </div>
       </Row>
       <div className='my-3'>
             <PaginateCategories page={result.page} pages={result.pages} 
               url="/admin/productsList" /> 
       </div>
    </div>
  )
}

export default ProductsList