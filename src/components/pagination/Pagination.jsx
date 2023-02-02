import React, { useState } from "react"

export default function Pagination({ currentPage, total, handlePage, count }) {
   const [current, setCurrent] = useState(currentPage)
   const totalPages = Math.ceil(total / count)

   return (
      <ul className='inline-flex -space-x-px cursor-pointer'>
         <li>
            <a
               className='px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
               onClick={(e) => (currentPage === 0 ? e.preventDefault() : handlePage(currentPage - 1))}
            >
               Previous
            </a>
         </li>
         {currentPage !== 0 ? (
            <li>
               <a
                  className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  onClick={() => handlePage(0)}
               >
                  0
               </a>
            </li>
         ) : (
            ""
         )}
         {currentPage !== totalPages - 1 ? (
            <li>
               <a
                  className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  onClick={() => handlePage(totalPages - 1)}
               >
                  {totalPages - 1}
               </a>
            </li>
         ) : (
            ""
         )}
         <li>
            <a
               className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
               onClick={(e) => (currentPage === totalPages - 1 ? e.preventDefault() : handlePage(currentPage + 1))}
            >
               Next
            </a>
         </li>
      </ul>
   )
}
