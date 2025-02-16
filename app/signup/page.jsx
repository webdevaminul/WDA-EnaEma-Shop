"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineLock, MdOutlinePhone } from "react-icons/md";
import TitleLeft from "@/components/Titles/TitleLeft";
import InputField from "@/components/Form/InputField";
import SubmitButton from "@/components/Form/SubmitButton";
import axios from "axios";
import FeedbackMessage from "@/components/Form/FeedbackMessage";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", formData);
      if (data.success) {
        setError(null);
        setLoading(false);
        router.push("/");
      } else {
        setError(null);
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again");
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
        <TitleLeft title="Sign up" subTitle="Fill in the form to create your account" />

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-5 md:gap-6 my-5 md:my-6"
        >
          <InputField
            icon={<FiUser />}
            type="text"
            placeholder="Full name*"
            name="userName"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.USERNAME_REQUIRED,
              maxLength: { value: 24, message: VALIDATION_MESSAGES.USERNAME_MAX_LENGTH },
            }}
            errors={errors}
            onInputChange={handleInputChange}
          />

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
            icon={<MdOutlinePhone />}
            type="number"
            placeholder="Phone Number*"
            name="userPhone"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.NUMBER_REQUIRED,
              minLength: { value: 8, message: VALIDATION_MESSAGES.NUMBER_MIN_LENGTH },
              maxLength: { value: 24, message: VALIDATION_MESSAGES.NUMBER_MAX_LENGTH },
            }}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <InputField
            icon={<MdOutlineLock />}
            type="password"
            placeholder="Create password*"
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

          {error && <FeedbackMessage message={error} type={"error"} />}

          <SubmitButton isLoading={loading} loadingLabel="Signing up..." label="Sign up" />
        </form>

        <p className="text-sm text-center">
          Already have an account?
          <Link href="/signin" className="text-blue-500 hover:underline ml-1">
            Sign in here
          </Link>
        </p>
      </section>
    </main>
  );
}
