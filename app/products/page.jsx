import ProductCard from "@/components/ProductCard";
import TitleLeft from "@/components/Titles/TitleLeft";

// Fetch products on the server side
async function getProducts() {
  try {
    const res = await fetch(`http://localhost:3000/api/products/list`, {
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

export default async function page() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <TitleLeft
        title={"Product List"}
        subTitle={"Explore our various products and find the best for you."}
      />
      <div className="mt-5 grid grid-cols-12 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p className="text-center text-gray-600 col-span-12 h-80">No products available</p>
        )}
      </div>
    </div>
  );
}
