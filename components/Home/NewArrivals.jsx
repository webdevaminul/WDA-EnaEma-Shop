import Link from "next/link";
import TitleLeft from "../Titles/TitleLeft";
import CartAdd from "../Buttons/CartAdd";
import WishlistToggle from "../Buttons/WishlistToggle";

// Fetch products on the server side
async function getProducts() {
  try {
    const res = await fetch(`http://localhost:3000/api/products/list/new`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data?.products || [];
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
}

export default async function NewArrivals() {
  const products = await getProducts();

  return (
    <div className="container mx-auto my-5 md:my-10">
      <TitleLeft
        title={"New Arrivals"}
        subTitle={"Shop online for new arrivals and get free shipping"}
      />
      <div className="mt-5 grid grid-cols-12 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="col-span-12 sm:col-span-6 md:col-span-3 border rounded-lg hover:shadow-lg p-3 animate-fade-in"
            >
              <Link href={`/products/details/${product._id}`} className="relative">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <p
                  className={`absolute top-0 left-0 text-sm rounded ${
                    product.stock > 0
                      ? "text-white bg-emerald-600 p-1"
                      : "text-white bg-red-500 p-1"
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
          ))
        ) : (
          <p className="text-center text-gray-400">No new arrivals available</p>
        )}
      </div>
    </div>
  );
}
