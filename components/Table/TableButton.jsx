import { FiLoader } from "react-icons/fi";

export default function TableButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  isLoading = false,
  disabled = false,
}) {
  const baseStyles =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition duration-300";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? <FiLoader className="animate-spin" /> : null}
      {children}
    </button>
  );
}
