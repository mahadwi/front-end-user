import ProductCart from '@/components/products/detail/productCart';
import ProductImage from '@/components/products/detail/productImage';
import fetchWithTokenClient from '@/lib/fetchWithTokenClient';
import Image from "next/image";
import { getCookie } from "cookies-next";

export default async function ProductDetail({params}) {
  const res = await fetchWithTokenClient(`api/products/${params.id}`,  "GET", {cache: "no-store"});
  // const token = getCookie(`accessToken`);
  // console.log(res)
  return (
    <>
    <div className='items-center justify-center h-screen my-8'>
      <div className="flex flex-row justify-center gap-8 p-5">
        <div className="basis-1/4"><ProductImage productDetail = {res.data} /></div>
        <div className="basis-3/4 px-8"><ProductCart productDetail = {res.data} /></div>
      </div>
    </div>
    </>
  )
}