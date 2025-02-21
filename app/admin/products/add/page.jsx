"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MdTitle, MdAttachMoney, MdCategory, MdImage } from "react-icons/md";
import TitleLeft from "@/components/Titles/TitleLeft";
import InputField from "@/components/Form/InputField";
import SubmitButton from "@/components/Form/SubmitButton";
import TextAreaField from "@/components/Form/TextAreaField";
import FeedbackMessage from "@/components/Form/FeedbackMessage";
import { VALIDATION_MESSAGES } from "@/utils/validationMessages";

export default function page() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (formData) => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await axios.post("/api/products/admin/add", formData);
      if (data.success) {
        router.push("/admin/products");
        setLoading(false);
        reset();
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-sm mx-auto flex items-center justify-center">
      <section className="my-10 w-full">
        <TitleLeft title="Add Product" subTitle="Fill in the form to create a new product" />

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-5 md:gap-6 my-5 md:my-6"
        >
          <InputField
            icon={<MdTitle />}
            type="text"
            placeholder="Product Name*"
            name="name"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.PRODUCT_NAME_REQUIRED,
              maxLength: { value: 40, message: VALIDATION_MESSAGES.PRODUCT_NAME_MAX_LENGTH },
            }}
            errors={errors}
          />

          <InputField
            icon={<MdImage />}
            type="text"
            placeholder="Product Image URL*"
            name="image"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.PRODUCT_IMAGE_REQUIRED,
            }}
            errors={errors}
          />

          <InputField
            icon={<MdAttachMoney />}
            type="number"
            placeholder="Price*"
            name="price"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.PRODUCT_PRICE_REQUIRED,
              min: { value: 1, message: VALIDATION_MESSAGES.PRODUCT_PRICE_MIN },
            }}
            errors={errors}
          />

          <InputField
            icon={<MdCategory />}
            type="number"
            placeholder="Initial Quantity*"
            name="stock"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.PRODUCT_QUANTITY_REQUIRED,
              min: { value: 1, message: VALIDATION_MESSAGES.PRODUCT_QUANTITY_MIN },
            }}
            errors={errors}
          />

          <TextAreaField
            placeholder={"Enter a short description*"}
            name={"description"}
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.PRODUCT_DESCRIPTION_REQUIRED,
              maxLength: {
                value: 500,
                message: VALIDATION_MESSAGES.PRODUCT_DESCRIPTION_MAX_LENGTH,
              },
            }}
            errors={errors}
            rows={6}
          />

          {error && <FeedbackMessage message={error} type={"error"} />}

          <SubmitButton isLoading={loading} loadingLabel="Adding product..." label="Add product" />
        </form>
      </section>
    </main>
  );
}
