import React from 'react'
import Image from 'next/image';

export default function ProductImage({productDetail}) {

  console.log(productDetail.product_detail);
  const imageError = "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  return (
    <div className='w-full h-full'>
      <img src={productDetail.product_detail[0].photo || imageError}   
        alt={productDetail.product_detail[0].photo} 
        width={500}
        height={500}
        style={{objectFit: "cover"}}
      />
    </div>
  )
}