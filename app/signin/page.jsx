"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlineLock, MdOutlinePhone } from "react-icons/md";
import TitleLeft from "@/components/Titles/TitleLeft";
import InputField from "@/components/Form/InputField";
import SubmitButton from "@/components/Form/SubmitButton";
import axios from "axios";
import FeedbackMessage from "@/components/Form/FeedbackMessage";
import Link from "next/link";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ error: null, success: null });

  const VALIDATION_MESSAGES = {
    USERNAME_REQUIRED: "User name is required",
    USERNAME_MAX_LENGTH: "Max 24 characters",
    EMAIL_REQUIRED: "Email address is required",
    EMAIL_INVALID: "Invalid email",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Min 8 characters",
    PASSWORD_MAX_LENGTH: "Max 24 characters",
    PASSWORD_PATTERN: "Must contain letters and numbers",
    NUMBER_REQUIRED: "Phone number is required",
    NUMBER_MIN_LENGTH: "Min 8 characters",
    NUMBER_MAX_LENGTH: "Max 24 characters",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (formData) => {
    setFeedback({ error: null, success: null });
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signin", formData);
      if (data.success) {
        setFeedback({ error: null, success: data.message });
        setLoading(false);
      } else {
        setFeedback({ error: data.message, success: null });
        setLoading(false);
      }

      console.log("formData", formData);
    } catch (err) {
      setFeedback({
        error: err.response?.data?.message || "Something went wrong. Please try again",
        success: null,
      });
      setLoading(false);
    }
  };

  const handleInputChange = () => {
    if (feedback.success || feedback.error) {
      setFeedback({ error: null, success: null });
    }
  };

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
            name="userEmail"
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
            name="userPassword"
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

          {feedback.success && <FeedbackMessage message={feedback.success} type={"success"} />}
          {feedback.error && <FeedbackMessage message={feedback.error} type={"error"} />}

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
