"use client"
/*
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
*/

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginateCategories = ({ pages, page, categoryName, url }: any) => {
  const pathname = usePathname();
  const router = useRouter();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = pages;
    const currentPage = page;

    for (let i = 1; i <= totalPages; i++) {
      // Show only a subset of page numbers with current page in the center
      if (i === 1 || i === currentPage - 1 || i === currentPage || i === currentPage + 1 || i === totalPages) {
        pageNumbers.push(
          <div
            onClick={() =>
              router.push(
                pathname.startsWith('/browse-products')
                  ? `${url}?categoryName=${categoryName}&page=${i}`
                  : `${url}?page=${i}`
              )
            }
            key={i}
            className={`mx-1 ${i === currentPage ? 'active' : ''}`}
          >
            {i}
          </div>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        // Show ellipsis for skipped page numbers
        pageNumbers.push(
          <div key={i} className='mx-1 ellipsis'>
            ...
          </div>
        );
      }
    }

    return pageNumbers;
  };

  return (
    pages > 1 && (
      <div className='flex w-full justify-center items-center mt-[10px] '>
        <Pagination>{renderPageNumbers()}</Pagination>
        <style jsx global>{`
          .pagination {
            display: flex;
            align-items: center;
          }
          .pagination div {
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 4px;
            transition: background-color 0.3s;
          }
          .pagination div:hover {
            background-color: #007bff;
            color:#fff;
          }
          .pagination div.active {
            background-color: #007bff;
            color: #fff;
          }
          .pagination div.ellipsis {
            cursor: default;
          }
        `}</style>
      </div>
    )
  );
};

export default PaginateCategories;
