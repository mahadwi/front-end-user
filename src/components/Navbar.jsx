import Link from "next/link";
import Image from "next/image";
import SearchComponent from "./Search";
import logo from "./assets/logo.png";
import ClientNavbar from "./ClientNavbar";
import { cookies } from "next/headers";
import fetchWithToken from "@/lib/fetchWithToken";

export default async function Navbar() {
  let userData = null;
  //Check Token
  let isLoggedIn = false;
  const accessToken = cookies().get("accessToken");
  if (accessToken) {
    const token = accessToken.value;

    // Get User Data
    const res = await fetchWithToken("api/user", token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Adjust content type if needed
      },
      cache: "no-store",
    });

    userData = res?.data;
    if (userData) {
      isLoggedIn = true;
    }
  }
  
  return (
    <div className="flex flex-row bg-white w-full top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="btn btn-ghost normal-case text-xl hidden md:flex">
          <Image alt="Coolest Brand ver!" src={logo} width="170" height="auto" priority />
        </Link>

        {/* search Bar */}
        <SearchComponent />

        {/* Client Component Or Login */}
        {isLoggedIn ? (
          <ClientNavbar />
        ) : (
          <Link className="btn btn-primary text-white" href="/auth/login">
            Log In
          </Link>
        )}
        {/* <Link className="btn btn-primary text-white" href="/auth/login">
          Log In
        </Link> */}
      </div>
    </div>
  );
}
