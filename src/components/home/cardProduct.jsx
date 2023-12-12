import Link from "next/link"
import { shortenText } from './style/responsive'
import './style/cardProduct.css'

const cardProduct = ({product}) => {

  const imageError = "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"

  return (
    <div className='carouselItem border-2 border-color-dark border-opacity-25 md:border-opacity-0 p-2'>
      <img
        src={product.product_detail[0].photo || imageError}
        alt="product"
        className='product--image'
        onError={(e) => {
          e.target.src = imageError
        }}
      />
      <h4 className='text-xl font-medium mt-2'>{shortenText(product.name, 18)}</h4>
      <p className='mb-1'>{shortenText(product.description, 26)}</p>

      <Link href={`/products/detail/${product.id}`}>
        <button className="bg-primary text-base-content p-2 rounded-lg">
          <div className="block text-white hover:underline cursor-pointer">
            <p className="text-md">Details</p>
          </div>
        </button>
      </Link>
    </div>
  )
}

export default cardProduct
