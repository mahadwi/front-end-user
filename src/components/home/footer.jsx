import Image from "next/image";
import logo from "../assets/logo2.png";
import fetchData from "@/lib/fetch";
import Link from "next/link";

export default async function Footer() {
  const { data } = await fetchData("api/category", "GET", {
    cache: "no-store",
  });
  const category = data;
  // console.log(category);

  return (
    <div className="sticky bottom-0">
      <div className="flex-grow"></div>
      <footer className="mt-auto footer p-10 bg-primary text-base-content">
        <aside>
          <Link href="/">
            <Image alt="logo" src={logo} width={250} height={50} className="fill-current w-auto" />
          </Link>
          <p className="text-white text-md pt-2">
            First Step is a fashion retail product for Mother & child.
            <br />
            Established on 23 November 2023 in Jakarta.
          </p>
        </aside>
        <nav>
          <header className="footer-title text-white opacity-100">SHOP BY COLLECTION</header>
          <ul className="list-none flex flex-col">
            {category.map((categoryItem, index) => {
              return (
                <li key={categoryItem.id}>
                  <Link href={`/category/${categoryItem.id}`} className="pb-2 text-white font-light">
                    {categoryItem.category_name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav>
          <header className="text-white opacity-100">PELAYANAN</header>
          <p className=" text-white font-light">Jam dan Hari Kerja</p>
          <p className=" text-white font-light">09.00 - 17.00</p>
          <p className="text-white font-light">(Senin - Minggu)</p>
        </nav>
        <nav>
          <header className="footer-title text-white opacity-100">Social</header>
          <div className="grid grid-flow-col gap-4">
            <a className="text-white opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a className="text-white opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a className="text-white opacity-80">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
            <a className="text-white opacity-80">
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>

      <footer className="footer footer-center pb-4 bg-primary text-base-content">
        <aside>
          <p className="text-white text-md">Copyright © 2023 - First Step | Developed by Kelompok 2</p>
        </aside>
      </footer>
    </div>
  );
}
