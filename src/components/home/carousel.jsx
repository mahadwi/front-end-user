import { useState, useEffect } from "react";
import Image from "next/image";
import carousel1 from "../assets/1.webp";
import carousel2 from "../assets/2.png";
import carousel3 from "../assets/3.png";
import carousel4 from "../assets/1.webp";

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide % 4) + 1); // Cycle through slides 1 to 4
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const getSlide = (slideNumber) => {
    switch (slideNumber) {
      case 1:
        return carousel1;
      case 2:
        return carousel2;
      case 3:
        return carousel3;
      case 4:
        return carousel4;
      default:
        return null;
    }
  };

  const handleSlideClick = (slideNumber) => {
    setActiveSlide(slideNumber);
  };

  return (
    <div className="carousel w-full">
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={`slide${i + 1}`}
          className={`carousel-item relative w-full ${
            i + 1 === activeSlide ? "" : "hidden"
          }`}
        >
          <Image alt="" src={getSlide(i + 1)} className="w-full" priority />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${i === 0 ? 4 : i}`}
              className="btn btn-circle"
              onClick={() => handleSlideClick(i === 0 ? 4 : i)}
            >
              ❮
            </a>
            <a
              href={`#slide${i === 3 ? 1 : i + 2}`}
              className="btn btn-circle"
              onClick={() => handleSlideClick(i === 3 ? 1 : i + 2)}
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
