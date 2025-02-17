"use client";

import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { MdError, MdOutlineEmail, MdOutlineLock, MdOutlinePhone } from "react-icons/md";
import TitleLeft from "@/components/Titles/TitleLeft";
import InputField from "@/components/Form/InputField";
import SubmitButton from "@/components/Form/SubmitButton";
import { MdTitle, MdAttachMoney, MdDescription, MdCategory, MdImage } from "react-icons/md";
import TextAreaField from "@/components/Form/TextAreaField";

export default function page() {
  const VALIDATION_MESSAGES = {
    PRODUCT_NAME_REQUIRED: "Product name is required",
    PRODUCT_NAME_MAX_LENGTH: "Max 40 characters",
    PRODUCT_IMAGE_REQUIRED: "Product image is required",
    PRODUCT_PRICE_REQUIRED: "Product price is required",
    PRODUCT_PRICE_MIN: "Price must be at least 1",
    PRODUCT_QUANTITY_REQUIRED: "Quantity is required",
    PRODUCT_QUANTITY_MIN: "Quantity must be at least 1",
    PRODUCT_DESCRIPTION_REQUIRED: "Product description is required",
    PRODUCT_DESCRIPTION_MAX_LENGTH: "Max 500 characters",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log("Product Data:", data);
  };

  const handleInputChange = () => {
    console.log("InputChange");
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
            onInputChange={handleInputChange}
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
            onInputChange={handleInputChange}
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
            onInputChange={handleInputChange}
          />

          <InputField
            icon={<MdCategory />}
            type="number"
            placeholder="Initial Quantity*"
            name="quantity"
            register={register}
            validationRules={{
              required: VALIDATION_MESSAGES.PRODUCT_QUANTITY_REQUIRED,
              min: { value: 1, message: VALIDATION_MESSAGES.PRODUCT_QUANTITY_MIN },
            }}
            errors={errors}
            onInputChange={handleInputChange}
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

          <SubmitButton isLoading={false} loadingLabel="Adding product..." label="Add product" />
        </form>
      </section>
    </main>
  );
}
