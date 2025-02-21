import { MdError } from "react-icons/md";

export default function InputField({
  icon,
  type,
  placeholder,
  name,
  register,
  validationRules,
  errors,
  isAutoComplete = "off",
}) {
  return (
    <div className="flex flex-col gap-1 w-full animate-fade-in">
      <div
        className={`flex items-center border rounded ${
          errors[name] ? "border-red-500" : "border-gray-600"
        }`}
      >
        <span className="p-2 text-xl text-gray-600">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent outline-none placeholder:text-gray-600 p-2 w-full"
          {...register(name, { ...validationRules })}
          aria-invalid={!!errors[name]}
          autoComplete={isAutoComplete}
        />
      </div>
      {errors[name] && (
        <p id={`${name}-error`} className="text-red-500 text-sm">
          <MdError className="inline mr-1" />
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
