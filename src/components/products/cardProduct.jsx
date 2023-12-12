import Link from "next/link"

const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
}

const cardProduct = ({product}) => {

  const imageError = "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"

  return (
    <div className="card w-45 bg-base-60 shadow-xl ">
      <figure className="p-2">
        <img 
          src={product.product_detail[0].photo || imageError}
          alt="product"
          className="rounded-xl"
          onError={(e) => {
            e.target.src = imageError
          }}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{shortenText(product.name, 18)}</h2>
        <p>{shortenText(product.description, 26)}</p>
        <Link href={`/products/detail/${product.id}`}>
          <button className="bg-primary text-base-content p-2 rounded-lg">
            <div className="block text-white hover:underline cursor-pointer">
              <p className="text-md">Details</p>
            </div>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default cardProduct
