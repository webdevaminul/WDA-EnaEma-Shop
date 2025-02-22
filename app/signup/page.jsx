"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineLock, MdOutlinePhone } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
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

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

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
      const { data } = await axios.post("/api/auth/signup", requestData);
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
    dispatch(resetError());
  }, [dispatch]);

  return (
    <main className="max-w-xs mx-auto flex items-center justify-center">
      <section className="my-10 w-full">
        <TitleLeft title="Sign up" subTitle="Fill in the form to create your account" />

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-5 md:gap-6 my-5 md:my-6"
        >
          <InputField
            icon={<FiUser />}
            type="text"
            placeholder="Full name*"
            name="name"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.USERNAME_REQUIRED,
              maxLength: { value: 24, message: VALIDATION_MESSAGES.USERNAME_MAX_LENGTH },
            }}
            errors={errors}
          />

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
            icon={<MdOutlinePhone />}
            type="number"
            placeholder="Phone Number*"
            name="phone"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.NUMBER_REQUIRED,
              minLength: { value: 8, message: VALIDATION_MESSAGES.NUMBER_MIN_LENGTH },
              maxLength: { value: 24, message: VALIDATION_MESSAGES.NUMBER_MAX_LENGTH },
            }}
            errors={errors}
          />

          <InputField
            icon={<MdOutlineLock />}
            type="password"
            placeholder="Create password*"
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

          <SubmitButton isLoading={loading} loadingLabel="Signing up..." label="Sign up" />
        </form>

        <p className="text-sm text-center">
          Already have an account?
          <Link href="/signin" className="text-emerald-600 hover:underline ml-1">
            Sign in here
          </Link>
        </p>
      </section>
    </main>
  );
}
