import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import NewArrivals from "@/components/Home/NewArrivals";
import Reviews from "@/components/Home/Reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <NewArrivals />
      <Reviews />
    </main>
  );
}
