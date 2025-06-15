"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({ subsets: ["latin"] });

interface SocialLink {
  src: string;
  alt: string;
  link: string;
}

const socialLinks: SocialLink[] = [
  { src: "/images/x.png", alt: "Twitter", link: "https://x.com/shribaspanja" },
  {
    src: "/images/linkedin.png",
    alt: "LinkedIn",
    link: "https://www.linkedin.com/in/shribaspanja/",
  },
  {
    src: "/images/facebook.png",
    alt: "Facebook",
    link: "https://www.facebook.com/shribaspanja/",
  },
  {
    src: "/images/github.png",
    alt: "GitHub",
    link: "https://github.com/ShribasPanja",
  },
  { src: "/images/mail.png", alt: "Email", link: "mailto:shribaspanja@gmail.com" },
];

const Footer: React.FC = () => {
  const textRef = useRef<(HTMLSpanElement | null)[]>([]);

  const iconsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "bounce.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: textRef.current[0]?.parentElement,
          start: "top 80%",
          toggleActions: "play none none reset",
          once: false,
        },
      }
    );
  }, []);

  return (
    <footer className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/footer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-gray-400 text-center px-4">
        <h1
          className={`text-[8vw] sm:text-[5vw] md:text-[3.5vw] font-extrabold tracking-wide mb-10 flex flex-wrap justify-center gap-2 ${comfortaa.className}`}
        >
          {["Let's ", "Connect ", "& ", "Collaborate"].map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                textRef.current[index] = el;
              }}
              className="inline-block"
            >
              {word}
            </span>
          ))}
        </h1>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                iconsRef.current[index] = el;
              }}
              className="w-[10vw] h-[10vw] sm:w-[8vw] sm:h-[8vw] md:w-[3.2vw] md:h-[3.2vw] hover:scale-110 transition-transform duration-300"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-sm text-black text-center">
        Made with <span className="text-red-500 text-lg">♥</span> by Shribas
        Panja &nbsp;|&nbsp; © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
