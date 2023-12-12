import Link from "next/link";

export default function Container({ children }) {
  return (
    <div className="container mx-auto min-h-[60vh] my-3">
      <div className="text-primary grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-lg:gap-3 max-[440px]:grid-cols-1 max-[440px]:px-2">
        {children}
      </div>
    </div>
  );
}
