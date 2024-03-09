/* eslint-disable react/no-unescaped-entities */


import {  Col, Row, Table } from "react-bootstrap";
import Link from 'next/link'
import { FaCheck, FaTimes } from "react-icons/fa";
import { getAllOrders } from "@/lib/actions/orders.actions";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/cart.actions";
import { getShipping } from "@/lib/actions/shipping.actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "marjanemall Maroc Orders List",
};
const OrdersList = async() => {
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
 
  const shipping = await getShipping({userId: user?.user?._id})
  const result = await getAllOrders()
 
  

  return (
    <div className='max-w-[1400px] mx-auto '>
      <Row className='align-items-center m-4'>
        <Col>
          <h2 className="text-[#333] font-extrabold sm:text-[30px] text-[20px] sm:mx-[20px] mx-[10px] ">Orders List</h2>
        </Col>

        <div className="w-full mt-4">
          <div className="products-table">
            <Table responsive bordered striped hover className='table-sm'>
              <thead>
                <tr>
                  <th className='text-center whitespace-nowrap'>ORDER ID</th>
                  <th className='text-center whitespace-nowrap'>NAME</th>
                  <th className='text-center whitespace-nowrap'>PHONE</th>
                  <th className='text-center whitespace-nowrap'>EMAIL</th>
                  <th className='text-center whitespace-nowrap'>DATE</th>
                  <th className='text-center whitespace-nowrap'>TOTAL</th>
                  <th className='text-center whitespace-nowrap'>PAYMENT TYPE</th>
                  <th className='text-center whitespace-nowrap'>PAID</th>
                  <th className='text-center whitespace-nowrap'>DELIVERED</th>
                  <th className='text-center whitespace-nowrap'>ORDER DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {result.map((order:any) => (
                  <tr key={order._id}>
                    <td className='text-[14px] text-center font-bold text-[#333] whitespace-nowrap'>{order._id}</td>
                    <td className='text-[14px] text-center font-bold text-[#333] whitespace-nowrap'>{order?.userId?.name}</td>
                    <td className='text-[14px] text-center font-bold text-[#333] whitespace-nowrap'>{order.shippingAddress.phoneNumber || shipping.phoneNumber}  </td>
                    <td className='text-[14px] text-center font-bold text-[#333] whitespace-nowrap'>{order?.userId?.email || "" }</td>
                    <td className='text-[14px] text-center font-bold text-[#333] whitespace-nowrap'>
                      {order.createdAt ? order.createdAt.toISOString().substring(0, 10) : ""}
                      </td>

                    <td className='text-[14px] text-center font-bold text-[#333] whitespace-nowrap'>{order.itemsPrice >= 400 ? order.itemsPrice + 0 : order.itemsPrice + 30} Dh</td>
                    <td className='text-[14px] text-center font-bold text-[#333] whitespace-nowrap'>{order.paymentMethode}</td>
                    <td className='text-[14px] text-center font-bold text-[#333] whitespace-nowrap'>
  {order.isPaid ? <FaCheck size={20} className="mx-auto" color="green" /> : <FaTimes size={20} className="mx-auto" color='red' />}
</td>
<td className='text-[14px] text-center font-bold text-[#333] whitespace-nowrap'>
  {order.isDelivered ? <FaCheck size={20} className="mx-auto" color="green" /> : <FaTimes size={20} className="mx-auto" color='red' />}
</td>

                    
                       <td className="text-center whitespace-nowrap">
                         <Link className='text-[#00afaa] hover:underline text-[14px] 
                         text-center font-bold  whitespace-nowrap'
                          href={`/sales/history/view/order_id/${order._id}`}>
                           View Order
                          </Link>
                       </td>
                    
                   
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default OrdersList;
