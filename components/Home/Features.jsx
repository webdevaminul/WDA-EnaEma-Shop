import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag, BiShield, BiSupport } from "react-icons/bi";

export default function Features() {
  const features = [
    {
      title: "Secure Payment",
      icon: BiShield,
      description: "Your payment information is processed securely.",
    },
    {
      title: "Fast Delivery",
      icon: BiShoppingBag,
      description: "We ensure quick and safe delivery of your products.",
    },
    {
      title: "Customer Support",
      icon: BiSupport,
      description: "24/7 customer support to assist with any queries.",
    },
    {
      title: "Wishlist & Favorites",
      icon: AiOutlineHeart,
      description: "Save your favorite items for easy access later.",
    },
  ];

  return (
    <div className="container mx-auto text-gray-600 my-5 md:my-10 lg:my-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg animate-fade-in-right transition duration-300"
        >
          <feature.icon className="text-4xl text-emerald-500 mb-3" />
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
