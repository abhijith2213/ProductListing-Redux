import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import StarRating from "../starRating/StarRating"
import { useNavigate } from "react-router-dom"

export default function ProductDetails() {
   const navigate = useNavigate()
   const { id } = useParams()
   const product = useSelector((state) => state.products.items.find((p) => p.id === parseInt(id)))

   return (
      <>
         {/* component */}
         <section className='text-gray-700 body-font overflow-hidden bg-white'>
            <div className='container px-5 py-8 mx-auto'>
               <div className='lg:w-4/5 mx-auto flex flex-wrap '>
                  <div className='lg:w-1/2 border border-gray-200 flex justify-center'>
                     <img
                        alt='ecommerce'
                        className='lg:h-[480px] lg:w-[350px] object-fill  w-full  object-center rounded  '
                        src={product.image}
                     />
                  </div>
                  <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                     <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>{product.title}</h1>
                     <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                        CATEGORY: <span>{product.category}</span>
                     </h2>
                     <div className='flex mb-4'>
                        <span className='flex items-center'>
                           <span className='flex text-lg text-yellow-300'>
                              {[...Array(5)].map((n, i) => (
                                 <StarRating
                                    key={i}
                                    full={i < Math.floor(product?.rating?.rate)}
                                    half={
                                       i === Math.floor(product?.rating?.rate) &&
                                       product?.rating?.rate - Math.floor(product?.rating?.rate) >= 0.5
                                    }
                                 />
                              ))}
                           </span>
                           <span className='text-gray-600 ml-3'>{product?.rating?.rate} </span>
                           <p className='ml-3 text-gray-400'>
                              (<span>{product?.rating?.count}</span> reviews)
                           </p>
                        </span>
                     </div>
                     <p className='leading-relaxed'>{product.description}</p>

                     <div className='inline-block'>
                        <p className='mt-6 text-lg font-medium'>
                           Price :
                           <span className='title-font font-medium text-2xl text-gray-900 ml-3'>${product?.price}</span>
                        </p>
                        <button
                           className='flex mt-8 ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'
                           onClick={() => navigate(-1)}
                        >
                           Go back
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
