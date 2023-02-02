import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import LoadingOverlay from "react-loading-overlay-ts"
import PropagateLoader from "react-spinners/PropagateLoader"
import Pagination from "../pagination/Pagination"
import { fetchProducts, setCurrentPage } from "../../redux/productSlice"
import StarRating from "../starRating/StarRating"

export default function Product() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [search, setSearch] = useState("")
   const [categories, setCategories] = useState([])
   const [filter, setFilter] = useState("")

   let products = useSelector((state) => state?.products?.items)
   const currentPage = useSelector((state) => state?.products?.currentPage)
   const count = useSelector((state) => state?.products?.count)
   const loading = useSelector((state) => state?.products?.loading)
   useEffect(() => {
      dispatch(fetchProducts())
   }, [])

   useEffect(() => {
      const categories = [...new Set(products.map((data) => data.category))]
      setCategories(categories)
   }, [loading])

   let items = products

   if (search) {
      items = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
   }

   if (filter !== "") {
      items = items.filter((item) => item.category === filter)
   }

   const handleView = (id) => {
      navigate(`/product/${id}`)
   }

   const handlePage = (page) => {
      dispatch(setCurrentPage(page))
   }

   return (
      <div className=''>
         {!loading ? (
            <>
               <div className='flex justify-center items-center mt-3 gap-4'>
                  {/* Search Button */}
                  <div className=' xl:w-96'>
                     <div className='input-group relative flex flex-wrap items-stretch w-full'>
                        <input
                           type='search'
                           className='form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                           placeholder='Search'
                           aria-label='Search'
                           onChange={(e) => setSearch(e.target.value)}
                        />
                     </div>
                  </div>
                  {/* Category Filter */}
                  <select
                     className=' focus:border rounded-md border-blue-400'
                     onChange={(e) => setFilter(e.target.value)}
                  >
                     <option selected disabled value=''>
                        Filter by Category
                     </option>
                     <option value=''>All</option>
                     {categories.map((category, i) => (
                        <option key={i} value={category}>
                           {category}
                        </option>
                     ))}
                  </select>
               </div>

               {/* Products List  */}
               <div className='flex flex-wrap -mx-px md:-mx-3 w-screen px-10 '>
                  {items.length != 0 ? (
                     items.slice(currentPage * count, (currentPage + 1) * count).map((val, i) => (
                        <div
                           key={i}
                           className=' relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md'
                        >
                           <a className='relative mx-3 mt-3 flex justify-center h-40 overflow-hidden rounded-xl'>
                              <img className='object-cover' src={val.image} alt='product image' />
                           </a>
                           <div className='mt-4 px-5 pb-5'>
                              <div className='min-h-[90px]'>
                                 <h5 className='text-xl tracking-tight text-slate-900'>{val.title}</h5>
                              </div>
                              <div className='mt-2 mb-5 flex items-center justify-between'>
                                 <p>
                                    <span className='text-2xl font-semibold text-slate-900'>${val.price}</span>
                                 </p>
                                 <div className='flex items-center'>
                                    <span className='flex text-lg text-yellow-300'>
                                       {[...Array(5)].map((n, i) => (
                                          <StarRating
                                             key={i}
                                             full={i < Math.floor(val?.rating?.rate)}
                                             half={
                                                i === Math.floor(val?.rating?.rate) &&
                                                val?.rating?.rate - Math.floor(val?.rating?.rate) >= 0.5
                                             }
                                          />
                                       ))}
                                    </span>
                                    <span className='mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold'>
                                       {val?.rating?.rate} of 5
                                    </span>
                                 </div>
                              </div>
                              <button
                                 className='flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
                                 onClick={() => handleView(val.id)}
                              >
                                 View
                              </button>
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className='w-screen h-full flex items-center justify-center my-20'>
                        <div>
                           <h2 className='text-center text-2xl font-medium text-blue-500'>Sorry....</h2>
                           <p className='text-xl text-blue-400 mt-4'>The product you are looking for is missing!</p>
                        </div>
                     </div>
                  )}
               </div>
               {items.length !== 0 && (
                  <div className='w-full flex justify-center my-6'>
                     <Pagination currentPage={currentPage} total={items.length} handlePage={handlePage} count={count} />
                  </div>
               )}
            </>
         ) : (
            // {/* Loader  */}
            <div className='absolute w-full h-full flex items-center justify-center backdrop-blur-sm'>
               <LoadingOverlay active={loading} spinner={<PropagateLoader color='#36d7b7' />} text='Loading' />
            </div>
         )}
      </div>
   )
}
