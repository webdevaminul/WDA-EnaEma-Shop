import Image from "next/image";
import Link from "next/link";
import bannerImage from "@/public/banner_image.webp";
import PrimaryBtn from "../Buttons/PrimaryBtn";

export default function Hero() {
  return (
    <section className="md:my-5 m-4 bg-gray-100 p-6 md:p-10 rounded-xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-20 overflow-hidden">
      <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left md:max-w-[50%] animate-fade-in-left">
        <p className="text-2xl font-bold text-emerald-600 animate-fade-in">Get Cash on Delivery</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-600 text-nowrap animate-fade-in">
          Organic & Healthy
        </h1>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-600 animate-fade-in">Vegetables</h1>
        <Link href="/products" className="pt-5 md:pt-10">
          <PrimaryBtn label={"Shop Now"} />
        </Link>
      </div>

      <div className="flex items-center justify-center md:justify-end md:max-w-[50%] animate-fade-in-right">
        <Image
          src={bannerImage}
          alt="Grocery"
          className="rounded-full w-full sm:w-[70%] md:w-full lg:w-[70%] h-auto"
          priority
        />
      </div>
    </section>
  );
}
