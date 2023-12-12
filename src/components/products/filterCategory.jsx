import Link from 'next/link';

const FilterCategory = ({ category }) => {
  return (
    <div className='gap-2 my-2 hover:text-primary hover:underline'>
      <Link href={`/products/category/${category.id}`}>
        <p>{category.category_name}</p>
      </Link>
    </div>
  );
};

export default FilterCategory;