import TitleLeft from "../Titles/TitleLeft";
import ProductCard from "../ProductCard";

// Fetch products on the server side
async function getProducts() {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://wda-ena-ema-shop.vercel.app"
        : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/products/list/new`, {
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
    <div className="container mx-auto my-5 p-4 md:my-10 lg:my-20">
      <TitleLeft
        title={"New Arrivals"}
        subTitle={"Shop online for new arrivals and get free shipping"}
      />
      <div className="mt-5 grid grid-cols-12 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p className="text-center text-gray-600 col-span-12">No new arrivals available</p>
        )}
      </div>
    </div>
  );
}
