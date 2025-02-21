import Link from "next/link";
import CartAdd from "./Buttons/CartAdd";
import WishlistToggle from "./Buttons/WishlistToggle";

const ProductCard = ({ product }) => {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-3 border rounded-lg hover:shadow-lg p-3 animate-fade-in">
      <Link
        href={{
          pathname: `/products/details/${product._id}`,
          query: {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            stock: product.stock,
          },
        }}
        className="relative"
      >
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
        <p
          className={`absolute top-0 left-0 text-sm rounded ${
            product.stock > 0 ? "text-white bg-emerald-600 p-1" : "text-white bg-red-500 p-1"
          }`}
        >
          {product.stock > 0 ? "Available" : "Unavailable"}
        </p>
      </Link>

      <div className="border-t pt-3">
        <h2 className="text-lg text-gray-600">{product.name}</h2>
        <div className="flex items-center justify-between">
          <p className="mt-3 font-bold text-gray-600">${product.price}</p>
          <div className="flex items-center gap-2">
            <CartAdd product={product} />
            <WishlistToggle product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
