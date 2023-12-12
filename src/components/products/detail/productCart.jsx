'use client'
import React, { useState, useEffect } from 'react'
import { useAuthStore } from '@/zustand';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/lib/constant';
import { ToastContainer, toast } from "react-toastify";
import { getCookie } from "cookies-next";

export default function ProductCart({productDetail}) {
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [availableStock, setAvailableStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const token = getCookie(`accessToken`);
  
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Update available stock when color changes
    if (selectedItem) {
      const selectedProduct = productDetail.product_detail.find(item => item.id === selectedItem);
      if (selectedProduct) {
        setAvailableStock(selectedProduct.stock);
        setPrice(selectedProduct.price);
        setWeight(selectedProduct.weight);
      }
      console.log(`selected Product : ${selectedProduct}`)
    }
  }, [selectedItem, productDetail.product_detail]);

  console.log(`selected Color : ${selectedItem}`)

  const addToCart = async () => {
    const idProduct = productDetail.product_detail[0].product_id;

    console.log(`idProduct: ${idProduct}`)

    if (!isLoggedIn) {
      router.push("/auth/login");
      return
    }

    if (!token) {
      console.error('token not found')
      return
    }

    try {
      const response = await fetch(`${baseUrl}/api/cartproduct/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: idProduct,
          quantity: parseInt(quantity),
          price
        }),
      });

      // console.log(response.headers)
      // console.log(response.headers.authorization)

      const data = response.ok ? await response.json() : {};

      if (response.ok) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  function formatCurrency(amount) {
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }

  return (
    <div className="flex justify-arround">
      <div className='basis-3/4'>
        <h1 className="font-bold text-3xl">{productDetail.name}</h1>
        <div className="badge badge-info gap-2">
          {productDetail.product_detail[0].stock != 0 ? 'Stok Tersedia' : 'Stock Habis'}
        </div>
        <h1 className="font-bold text-2xl mb-5">{formatCurrency(price || productDetail.product_detail[0].price)}</h1>
        <p className="text-xl">{productDetail.description}</p>
      </div>
      <div className='basis-1/4'>
        <div className='flex flex-col'>
          <p>Warna : </p>
          <p className='flex gap-1 flex-wrap'>
            {productDetail.product_detail.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`badge bg-primary text-white hover:bg-white hover:text-primary gap-2 cursor-pointer`}
                  onClick={() => setSelectedItem(item.id)}
                >
                  {item.color}
                </span>
              )
            })}
          </p>
        </div>
        <p className='mb-5'>Berat : {weight || productDetail.product_detail[0].weight} Kg</p>
        <p>Qty : </p>
        <select
          className="select select-bordered select-sm w-full max-w-xs"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          disabled={!selectedItem || quantity > availableStock}
        >
          {[...Array(availableStock).keys()].map((item, index) => (
            <option key={index} value={item + 1}>{item + 1}</option>
          ))}
        </select>
        <button
          className="btn btn-success mt-5"
          onClick={addToCart}
          disabled={!selectedItem || quantity > availableStock}
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}