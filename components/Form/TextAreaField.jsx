import { MdError } from "react-icons/md";

export default function TextAreaField({
  placeholder,
  name,
  register,
  validationRules,
  errors,
  rows = 4,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <textarea
        placeholder={placeholder}
        className={`bg-transparent outline-none placeholder:text-gray-300 p-2 border rounded ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        {...register(name, { ...validationRules })}
        rows={rows}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="text-red-500 text-sm">
          <MdError className="inline mr-1" />
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
