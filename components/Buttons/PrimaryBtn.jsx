import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function PrimaryBtn({ label }) {
  return (
    <button className="my-2 bg-emerald-600 flex items-center gap-2 text-white hover:bg-emerald-500 font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 animate-fade-in">
      {label}
      <MdKeyboardDoubleArrowRight className="inline-block" />
    </button>
  );
}
