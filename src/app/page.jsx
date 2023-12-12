"use client";

import Carousel from "@/components/home/carousel";
import CarouselProduct from "@/components/home/carouselProduct";
import CardCategory from "@/components/home/cardCategory";
import fetchData from "@/lib/fetch";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {

  // Category
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await fetchData("api/category", "GET", {
          cache: "no-store",
        });
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <Carousel />
      <div className="flex items-center justify-center py-4">
        <header className="text-primary text-3xl font-bold px-5 py-2.5 text-center mb-4">Our Category</header>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex gap-5 ml-5 flex-wrap">
          {categories.map((category) => (
            <CardCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center py-4">
        <header className="text-primary text-3xl font-bold px-5 py-2.5 text-center mb-2">Our Products</header>
      </div>
      <CarouselProduct />
      <Link href='/products'>
        <p className="text-primary text-md font-semibold text-center mb-8">See All Products</p>
      </Link>
    </>
  );
}
