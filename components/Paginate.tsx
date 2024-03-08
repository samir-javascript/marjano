"use client"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Pagination } from 'react-bootstrap';



const PaginateCategories = ({ pages, page, categoryName, url }:any) => {
  const  pathname  = usePathname();
  const router = useRouter()
  return (
    pages > 1 && (
      <div className='flex w-full justify-center items-center mt-[10px] '>
        <Pagination>
           { /* @ts-ignore */}
          {[...Array(pages).keys()].map((x) => (
            <div  onClick={()=> router.push(pathname.startsWith('/browse-products')
            ? `${url}?categoryName=${categoryName}&page=${x + 1}`
            : `${url}?page=${x + 1}`)}
              key={x + 1}
              className='mx-1'
             
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </div>
          ))}
        </Pagination>
      </div>
    )
  );
};

export default PaginateCategories;
