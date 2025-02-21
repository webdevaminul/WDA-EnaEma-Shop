"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import TitleLeft from "../Titles/TitleLeft";

const cutText = (text, maxLength) =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      message:
        "I recently ordered fresh vegetables and groceries from this store, and I must say, I am beyond impressed! The vegetables were incredibly fresh, and the packaging was top-notch, ensuring everything stayed in perfect condition. The delivery was fast, and the customer service was exceptional. This has become my go-to store for groceries!",
      userName: "Sophia P.",
      role: "Verified Customer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      message:
        "I purchased some beauty products from this store, and I am thrilled with my experience! The skincare products were 100% authentic, and the quality was just as described. My order arrived earlier than expected, and everything was securely packed. It's rare to find such reliable service for beauty products. Highly recommended!",
      userName: "James K.",
      role: "Verified Customer",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    {
      id: 3,
      message:
        "Shopping for groceries online has never been this easy! I ordered essential kitchen items, including rice, cooking oil, and fresh dairy products. Everything was delivered on time, well-packed, and of excellent quality. I appreciate how they maintain hygiene standards and deliver fresh products every time. Definitely my new favorite online grocery store!",
      userName: "Emily S.",
      role: "Verified Customer",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      id: 4,
      message:
        "I absolutely love the variety of fresh fruits available at this store! I recently ordered mangoes, bananas, and apples, and I was amazed at how fresh and juicy they were. Unlike other stores, the fruits here were carefully selected and delivered in perfect condition. If you're looking for fresh and organic produce, this is the best place to shop!",
      userName: "Emma.",
      role: "Verified Customer",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
    },
  ];

  return (
    <section className="container mx-auto my-8 px-4 animate-fade-in-left">
      <TitleLeft
        title={"Customer Reviews"}
        subTitle={
          "Trusted by thousands of happy shoppers! Discover what our customers say about our high-quality products, fast delivery, and exceptional service."
        }
      />

      <Swiper
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="my-5">
            <div className="border rounded-2xl hover:shadow-md p-6 h-full flex flex-col justify-between">
              <div className="grid gap-4">
                <div className="text-emerald-500 text-3xl w-fit">
                  <ImQuotesLeft />
                </div>

                <p className="text-gray-600">{cutText(review.message, 300)}</p>

                <div className="flex justify-end">
                  <div className="text-emerald-500 text-3xl">
                    <ImQuotesRight />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border">
                    <img
                      src={review.image}
                      width={48}
                      height={48}
                      alt={review.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">{review.userName}</p>
                    <p className="text-sm text-gray-600">Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
