"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import TitleLeft from "@/components/Titles/TitleLeft";
import InputField from "@/components/Form/InputField";
import SubmitButton from "@/components/Form/SubmitButton";
import FeedbackMessage from "@/components/Form/FeedbackMessage";
import { setCartFromDB } from "@/lib/redux/cartSlice";
import { setWishlistFromDB } from "@/lib/redux/wishlistSlice";
import { VALIDATION_MESSAGES } from "@/utils/validationMessages";
import {
  loginFailure,
  LoginSuccess,
  requestFailure,
  requestStart,
  resetError,
} from "@/lib/redux/authSlice";

export default function Signin() {
  const { loading, error } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (formData) => {
    dispatch(resetError());
    dispatch(requestStart());
    try {
      const requestData = {
        ...formData,
        cartItems,
        wishlistItems,
      };
      const { data } = await axios.post("/api/auth/signin", requestData);
      if (data.success) {
        dispatch(LoginSuccess(data.user));
        dispatch(setCartFromDB(data.cartItems));
        dispatch(setWishlistFromDB(data.wishlistItems));
        router.push("/");
      } else {
        dispatch(loginFailure(data.message));
      }
    } catch (err) {
      dispatch(
        requestFailure(err.response?.data?.message || "Something went wrong. Please try again")
      );
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(resetError());
    }
  }, [dispatch, error]);

  return (
    <main className="max-w-xs mx-auto flex items-center justify-center h-[28rem]">
      <section className="my-10 w-full">
        <TitleLeft title={"Sign in"} subTitle={"Fill in the form to access your account"} />

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-5 md:gap-6 my-5 md:my-6"
        >
          <InputField
            icon={<MdOutlineEmail />}
            type="email"
            placeholder="Email address*"
            name="email"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.EMAIL_REQUIRED,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: VALIDATION_MESSAGES.EMAIL_INVALID,
              },
            }}
            errors={errors}
          />

          <InputField
            icon={<MdOutlineLock />}
            type="password"
            placeholder="Password*"
            name="password"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.PASSWORD_REQUIRED,
              minLength: { value: 8, message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH },
              maxLength: { value: 24, message: VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message: VALIDATION_MESSAGES.PASSWORD_PATTERN,
              },
            }}
            errors={errors}
          />

          {error && <FeedbackMessage message={error} type={"error"} />}

          <SubmitButton isLoading={loading} loadingLabel={"Signing in..."} label={"Sign in"} />
        </form>

        <p className="text-sm text-center">
          <span>Don&apos;t have an acoount?</span>
          <Link href="/signup" className="text-emerald-600 hover:underline ml-1">
            Sign up here
          </Link>
        </p>
      </section>
    </main>
  );
}
