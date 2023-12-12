"use client"

import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { useRef } from "react";

export default function SearchComponent() {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (event) => {
    const keyword = searchRef.current.value;

    if (!keyword || keyword.trim() === "") return;

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      router.push(`/products/search/${keyword}`)
    }
  };

  return (
    <form className="relative flex items-center justify-between max-auto">
      <input
        ref={searchRef}
        type="text"
        id="search-navbar"
        className="block w-full p-2 pl-10 pr-20 py-3 text-sm rounded-md border border-primary focus:outline-none focus:border-secondary"
        placeholder="Search..."
        onKeyDown={handleSearch}
      />
      <button
        className="hover:bg-primary rounded-md border border-primary p-[6px] mr-4 ml-2"
        onClick={handleSearch}
      >
        <CiSearch />
      </button>
    </form>
  );
}
