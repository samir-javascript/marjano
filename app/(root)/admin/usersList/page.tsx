import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Button, Table } from "react-bootstrap";
import Link from 'next/link';
import { getAllUsers } from "@/lib/actions/user.actions";

const UsersList = async () => {
  const result = await getAllUsers({});
  console.log('ALL USERS ARE HERE' , result)

  return (
    <div className='products-list'>
      <div className='align-items-center m-4'>
        <h2 className="text-[#333] font-extrabold text-[30px] w-full mt-5 mb-3 mx-[30px]">
          Users List
        </h2>
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
                   {result.users.map((user)=> (
                      <tr key={user._id}>
                          <td className='text-center whitespace-nowrap text-[15px] font-medium '>
                             {user._id}
                          </td>
                          <td className='text-center whitespace-nowrap text-[15px] font-medium'>
                             {user.email}
                          </td>
                          <td className='text-center whitespace-nowrap text-[15px] font-medium' >
                             {user.name}
                          </td>
                          <td className='text-center whitespace-nowrap text-[15px] font-medium'>
                             {user.isAdmin ? (
                                <FaCheck className="mx-auto" color='green' />
                             ): (
                                  <FaTimes className='mx-auto' color="red" />
                             )}
                          </td>
                           <td className='text-center whitespace-nowrap text-[15px] font-medium'>
                           <Link href={`/admin/user/${user._id}/edit`}>
                           <Button type='button' variant='light' className='btn-sm'>
                              <FaEdit color='green' />
                           </Button>
                           </Link>
                           
                         </td>
                         <td className='text-center whitespace-nowrap text-[15px] font-medium'>
                         <Button  type='button' variant='light' className='btn-sm'>
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
  );
};

export default UsersList;
