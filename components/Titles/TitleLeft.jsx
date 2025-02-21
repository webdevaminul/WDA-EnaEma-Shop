export default function TitleLeft({ title, subTitle }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-bold text-gray-600 text-nowrap animate-fade-in my-2">
        {title}
      </p>
      <p className="text-sm md:text-base text-gray-600 my-2">{subTitle}</p>
    </div>
  );
}
