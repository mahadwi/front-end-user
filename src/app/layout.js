import Navbar from "@/components/Navbar";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/home/footer";

export const metadata = {
  title: "First Step Store",
  description: "Leading Apparel E-commerce Store that sell high quality products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Navbar />
        </nav>
        <ToastContainer />
        <main className=" mx-auto "> {children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
