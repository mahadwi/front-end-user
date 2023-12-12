import React from "react";
import Link from "next/link";

const CardCategory = ({ category }) => {
  return (
    <div className="bg-primary text-base-content p-4 rounded-lg">
      <Link href={`/products/category/${category.id}`}>
        <div className="block text-white hover:underline cursor-pointer">
          <h2 className="text-lg font-semibold">{category.category_name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default CardCategory;
