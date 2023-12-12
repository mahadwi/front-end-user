"use client";
import { baseUrl } from "@/lib/constant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand";
import Link from "next/link";
import fetchData from '@/lib/fetch';

export default function Page() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  if (isLoggedIn) {
    router.push("/");
  }
  function isSlugFriendly(username) {
    const pattern = /^[a-z0-9-]+$/;
    return pattern.test(username) && username.length >= 6;
  }

  // province
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);

  useEffect(() => {
    async function fetchProvince() {
      try {
        const { data } = await fetchData(`api/user/province`, 'GET', {
          cache: 'no-store',
        });

        setProvinces(data);
      } catch (error) {
        console.error('Error fetching province:', error);
      }
    }

    fetchProvince();
  }, []);

  // console.log(`P : ${selectedProvince}`)

  // city
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(0);

  useEffect(() => {
    async function fetchCity() {
      try {
        const { data } = await fetchData(`api/user/city/province/${selectedProvince}`, 'GET', {
          cache: 'no-store',
        });

        setCities(data);
      } catch (error) {
        console.error('Error fetching province:', error);
      }
    }

    fetchCity();
  }, [selectedProvince]);
  // console.log(`C : ${cities}`)

  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setIsUsernameValid(isSlugFriendly(newUsername));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;
    const address = e.target.address.value;
    const postal_code = e.target.postal_code.value;

    if (password !== confirm_password) {
      toast.error("Password do not match");
      return;
    }
    // Check if username is valid
    if (!isUsernameValid) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
          address,
          postal_code,
          city_id: parseInt(selectedCity),
          province_id: parseInt(selectedProvince)
        }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
      } else {
        toast.error(`${data.message}`);
        return;
      }
      router.push("/auth/login");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
      <form onSubmit={handleSubmit} className=" py-4 rounded-lg bg-white shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl bg-cover bg-center my-20">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Registration Form
        </h1>
        <div className="flex p-8 gap-8">
          <div className="lg:block lg:w-1/2">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                name="username"
                placeholder="John-doe"
                value={username}
                onChange={handleUsernameChange}
              />
              {!isUsernameValid ? (
                <span className=" text-[11px] text-red-500 ">
                  Username should only contain lowercase letters, numbers, hyphens
                  and minimum of 6 character.
                </span>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                id="phone"
                name="phone"
                placeholder="081368****"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                id="password"
                name="password"
                placeholder="********"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirm_password"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="********"
              />
            </div>
          </div>

          <div className="lg:block lg:w-1/2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                name="address"
                id="address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Province
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                name="province"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                id="province"
              >
                <option value="" disabled>
                  Select a Province
                </option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                name="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                id="city"
              >
                <option value="" disabled>
                  Select a city
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Postal Code
                </label>
              </div>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number"
                name="postal_code"
                id="postal_code"
              />
            </div>
          </div>
        </div>
        <div className="mb-8 flex justify-center">
          <button
            type="submit"
            className="btn btn-primary text-white font-bold py-2 px-4 w-1/2 rounded"
          >
            Login
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="border-b w-1/5 md:w-1/4"></span>
          <Link
            href="/auth/login"
            className="text-xs text-gray-500 uppercase"
          >
            Login Here
          </Link>
          <span className="border-b w-1/5 md:w-1/4"></span>
        </div>
      </form>
  );
}
