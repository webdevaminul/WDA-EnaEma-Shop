export default function SubmitButton({ isLoading, loadingLabel, label }) {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className="animate-fade-in w-full p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
    >
      {isLoading ? loadingLabel : label}
    </button>
  );
}
