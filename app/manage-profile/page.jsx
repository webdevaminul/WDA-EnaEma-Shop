"use client";

import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { MdOutlinePhone, MdLocationOn, MdImage } from "react-icons/md";
import InputField from "@/components/Form/InputField";
import SubmitButton from "@/components/Form/SubmitButton";
import FeedbackMessage from "@/components/Form/FeedbackMessage";
import {
  updateProfileSuccess,
  requestStart,
  requestFailure,
  resetError,
} from "@/lib/redux/authSlice";
import { VALIDATION_MESSAGES } from "@/utils/validationMessages";

export default function ProfileUpdatePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading, error } = useSelector((state) => state.auth);
  const id = user?._id;

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("phone", user.phone);
      setValue("profile", user.profile);
      setValue("address", user.address || "");
    }
  }, [user, setValue]);

  const onSubmit = async (formData) => {
    dispatch(requestStart());
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        profile: formData.profile,
        address: formData.address,
      };

      const { data } = await axios.put(`/api/users/${id}/update`, payload);
      dispatch(updateProfileSuccess(data.user));
      router.push("/");
    } catch (err) {
      dispatch(requestFailure(err.response?.data?.message || "Update failed. Try again."));
    }
  };

  useEffect(() => {
    dispatch(resetError());
  }, []);

  return (
    <main className="max-w-md mx-auto p-6">
      <div>
        <p className="text-center text-3xl md:text-4xl font-bold text-gray-600 text-nowrap animate-fade-in my-2">
          Manage Profile
        </p>
        <p className="text-center text-sm md:text-base text-gray-600 my-2">
          Modify your profile details below
        </p>
      </div>

      <div className="flex items-center justify-center">
        <figure className="h-32 w-32 aspect-square rounded-full overflow-hidden  mt-10">
          <img
            src={user?.profile}
            alt="Profile"
            className="object-cover object-center w-full h-full"
          />
        </figure>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-6 w-full">
        <InputField
          icon={<FiUser />}
          type="text"
          placeholder="Full Name*"
          name="name"
          register={register}
          validationRules={{
            required: VALIDATION_MESSAGES.USERNAME_REQUIRED,
            maxLength: { value: 24, message: VALIDATION_MESSAGES.USERNAME_MAX_LENGTH },
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
          icon={<MdImage />}
          type="text"
          placeholder="Profile Image URL"
          name="profile"
          register={register}
          validationRules={{
            required: VALIDATION_MESSAGES.PROFILE_IMAGE_REQUIRED,
          }}
          errors={errors}
        />

        <InputField
          icon={<MdLocationOn />}
          type="text"
          placeholder="Address"
          name="address"
          register={register}
          errors={errors}
        />

        {error && <FeedbackMessage message={error} type="error" />}

        <SubmitButton isLoading={loading} loadingLabel="Updating..." label="Update Profile" />
      </form>
    </main>
  );
}
