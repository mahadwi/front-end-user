/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import CardProduct from './cardProduct'
import { responsive } from './style/responsive'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import fetchData from "@/lib/fetch";

const CarouselProduct = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await fetchData("api/products?page=1&pageSize=12", "GET", {
          cache: "no-store",
        });

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const getLimitedProducts = (productList, n) => {
    const sortedProducts = productList.sort((a, b) => a.id - b.id);
    const endIndex = Math.min(n, productList.length);
    return sortedProducts.slice(0, endIndex);
  };
  
  return (
    <div className='mb-2'>
      <Carousel
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        customTransition="all 500ms ease"
        transitionDuration={1000}
      >
        {products.map(product => (
          <CardProduct key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselProduct