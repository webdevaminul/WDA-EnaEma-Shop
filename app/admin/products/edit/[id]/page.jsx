"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MdTitle, MdAttachMoney, MdCategory, MdImage } from "react-icons/md";
import TitleLeft from "@/components/Titles/TitleLeft";
import InputField from "@/components/Form/InputField";
import SubmitButton from "@/components/Form/SubmitButton";
import TextAreaField from "@/components/Form/TextAreaField";
import FeedbackMessage from "@/components/Form/FeedbackMessage";
import { VALIDATION_MESSAGES } from "@/utils/validationMessages";

export default function page() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/details/${id}`);
        if (data.success) {
          const product = data.product;
          setValue("name", product.name);
          setValue("image", product.image);
          setValue("price", product.price);
          setValue("stock", product.stock);
          setValue("description", product.description);
        } else {
          setError("Failed to fetch product data.");
        }
      } catch (error) {
        setError("Error fetching product details.");
      }
    };

    fetchProduct();
  }, [id, setValue]);

  const handleFormSubmit = async (formData) => {
    setError(null);
    setLoading(true);

    // Ensure price and stock are sent as numbers
    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      const { data } = await axios.put(`/api/products/admin/update/${id}`, payload);
      if (data.success) {
        router.push("/admin/products");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-sm mx-auto flex items-center justify-center">
      <section className="my-10 w-full">
        <TitleLeft title="Edit Product" subTitle="Update product details" />

        {error && <FeedbackMessage message={error} type="error" />}

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
            placeholder="Stock Quantity*"
            name="stock"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.PRODUCT_QUANTITY_REQUIRED,
              min: { value: 0, message: VALIDATION_MESSAGES.PRODUCT_QUANTITY_MIN },
            }}
            errors={errors}
          />

          <TextAreaField
            placeholder="Enter a short description*"
            name="description"
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

          <SubmitButton isLoading={loading} loadingLabel="Updating..." label="Update Product" />
        </form>
      </section>
    </main>
  );
}
