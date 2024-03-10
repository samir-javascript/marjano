"use client"

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginateCategories = ({ pages, page, categoryName, url, filterName, filterRating }: any) => {
  const pathname = usePathname();
  const router = useRouter();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = pages;
    const currentPage = page;

    for (let i = 1; i <= totalPages; i++) {
      // Show only a subset of page numbers with current page in the center
      if (i === 1 || i === currentPage - 1 || i === currentPage ||
          i === currentPage + 1 || i === totalPages) {
        pageNumbers.push(
          <div
            onClick={() => {
              let query = '';
              if (pathname.startsWith('/browse-products')) {
                query = `categoryName=${categoryName}&page=${i}`;
              } else if (pathname.startsWith('/marjanemall_Products_list')) {
                query = filterName ? `filter=${filterName}&page=${i}` : filterRating ? `filterRating=${filterRating}&page=${i}` : `page=${i}`;
              } else {
                query = `page=${i}`;
              }
              router.push(`${url}?${query}`);
            }}
            key={i}
            className={`mx-1 ${i === currentPage ? 'active' : ''}`}
          >
            {i}
          </div>
        );
      } else if (i === currentPage - 1 || i === currentPage + 1) {
        // Show ellipsis for skipped page numbers
        pageNumbers.push(
          <div
            onClick={() => {
              let query = '';
              if (pathname.startsWith('/browse-products')) {
                query = `categoryName=${categoryName}&page=${i}`;
              } else {
                query = `page=${i}`;
              }
              router.push(`${url}?${query}`);
            }}
            key={i}
            className='mx-1 font-bold ellipsis cursor-pointer bg-[#007bff] text-white'
          >
            Next
          </div>
        );
      }
    }

    return pageNumbers;
  };

  return (
    pages > 1 && (
      <div className='flex w-full justify-center items-center mt-[10px]'>
        <Pagination>{renderPageNumbers()}</Pagination>
        <style jsx global>{`
          .pagination {
            display: flex;
            align-items: center;
          }
          .pagination div {
            cursor: pointer;
            padding: 6px 12px;
            width: 40px;
            display: flex;
            color: #0aaffa!important;
            font-weight: 600;
            font-size: 18px;
            height: 45px;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: background-color 0.3s;
          }
          .pagination div:hover {
            background-color: #007bff;
            color: #fff!important;
          }
          .pagination div {
            border: 1px solid #efefef;
          }
          .pagination div.active {
            background-color: #007bff;
            color: #fff!important;
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
