"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Comfortaa, Poetsen_One } from "next/font/google";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-comfortaa",
});
const poetsen = Poetsen_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poetsen",
});

const cardsData = [
  {
    id: 4,
    color: "#FF6500",
    title: "Flutter Intern",
    description:
      "Developed mobile applications using Flutter at Dotidea Infotech, contributing to production-ready features like real-time chat, video calls, razorpay integration, and more.",
    image: "/images/flutterdev.png",
    yearRange: "Dec 2024 - Present",
  },
  {
    id: 3,
    color: "#0B192C",
    title: "SIH 2023 Finalist",
    description:
      "Selected as a national finalist in Smart India Hackathon 2023 for a project solving real-world problems with technology.",
    image: "/images/sih.png",
    yearRange: "2023",
  },
  {
    id: 2,
    color: "#1E3E62",
    title: "Freelance Developer",
    description:
      "Delivered websites and web apps using React, Tailwind, GSAP for clients across industries. Handled full project lifecycle from design to deployment.",
    image: "/images/freelance.png",
    yearRange: "2023 - 2024",
  },
  {
    id: 1,
    color: "#522546",
    title: "Hackathon ",
    description:
      "Led teams in 10+ hackathons from 2022–2024, building blockchain and cybersecurity-based solutions. Specialized in smart contracts, dApp development, and tech pitching.",
    image: "/images/hackathon.png",
    yearRange: "2022 – 2024",
  },
];

export default function CardStack() {
  const containerRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const totalCards = cards.length;

      cards.forEach((card) => {
        gsap.set(card, {
          yPercent: 100,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (totalCards - 1)}`,
          scrub: true,
          pin: true,
        },
      });

      cards.forEach((card, i) => {
        tl.to(card, { yPercent: 0, opacity: 1, ease: "power2.out" }, i * 0.9);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {cardsData.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => {
            if (el) cardsRef.current[i] = el;
          }}
          className="absolute w-[90vw] h-[70vh] sm:w-[50vw] sm:h-[50vh] rounded-[2vw] shadow-2xl p-4 sm:p-8 flex items-center justify-center"
          style={{
            backgroundColor: card.color,
            zIndex: i + 1,
          }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center gap-6 sm:gap-20">
            <div className="w-[40vw] h-[40vw] sm:w-[15vw] sm:h-[15vw] rounded-[2vw] overflow-hidden border-4 border-white shadow-md relative">
              <Image
                src={card.image}
                alt={card.title}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 40vw, 15vw"
                priority={i === 0}
              />
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left max-w-[90%] sm:max-w-md">
              <h2
                className={`text-[6vw] sm:text-[2.5vw] font-bold text-white mb-2 ${comfortaa.className}`}
              >
                {card.title}
              </h2>
              <p
                className={`text-white text-opacity-90 text-[3.5vw] sm:text-[1vw] ${poetsen.className}`}
              >
                {card.description}
              </p>
              <div
                className={`text-white text-opacity-70 text-[3vw] sm:text-[0.9vw] mt-4 ${poetsen.className}`}
              >
                {card.yearRange}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
