import React from 'react'

export default function ProductInfo({productDetail}) {
  function formatCurrency(amount) {
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }
  
  return (
    <div>
      <h1 className="font-bold text-3xl">{productDetail.name}</h1>
      <div className="badge badge-info gap-2">
        {productDetail.product_detail[0].stock != 0 ? 'Stok Tersedia' : 'Stock Habis'}
      </div>
      <h1 className="font-bold text-2xl mb-5">{formatCurrency(productDetail.product_detail[0].price)}</h1>
      <p className="text-xl">{productDetail.description}</p>
    </div>
  )
}