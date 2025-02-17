"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import TitleLeft from "@/components/Titles/TitleLeft";
import InputField from "@/components/Form/InputField";
import SubmitButton from "@/components/Form/SubmitButton";
import axios from "axios";
import FeedbackMessage from "@/components/Form/FeedbackMessage";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  loginFailure,
  LoginSuccess,
  requestFailure,
  requestStart,
  resetError,
} from "@/lib/redux/authSlice";

export default function page() {
  const { loading, error } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const VALIDATION_MESSAGES = {
    EMAIL_REQUIRED: "Email address is required",
    EMAIL_INVALID: "Invalid email",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Min 8 characters",
    PASSWORD_MAX_LENGTH: "Max 24 characters",
    PASSWORD_PATTERN: "Must contain letters and numbers",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (formData) => {
    dispatch(resetError());
    try {
      dispatch(requestStart());
      const { data } = await axios.post("/api/auth/signin", formData);
      if (data.success) {
        dispatch(LoginSuccess(data.user));
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

  const handleInputChange = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <main className="max-w-xs mx-auto flex items-center justify-center">
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
            onInputChange={handleInputChange}
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
            onInputChange={handleInputChange}
          />

          {error && <FeedbackMessage message={error} type={"error"} />}

          <SubmitButton isLoading={loading} loadingLabel={"Signing in..."} label={"Sign in"} />
        </form>

        <p className="text-sm text-center">
          <span>Don&apos;t have an acoount?</span>
          <Link href="/signup" className="text-blue-500 hover:underline ml-1">
            Sign up here
          </Link>
        </p>
      </section>
    </main>
  );
}
