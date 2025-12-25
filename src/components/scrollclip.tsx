"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Poetsen_One } from "next/font/google";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);

const poetsen = Poetsen_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poetsen",
});

const imagesList = [
  {
    src: "/images/zipline.png",
    title: "ZIPLINE CI/CD",
    description:
      "Modern DevOps Platform with DAG Pipeline Orchestration like GitHub Actions.",
    live: "https://zipline.shribas.me/",
    repo: "https://github.com/ShribasPanja/zipline-be",
  },
  {
    src: "/images/recurio.png",
    title: "LinkedIn CRM Lite",
    description:
      "Import LinkedIn profiles with one click using LinkedIn CRM Lite web extension, track leads through your sales pipeline, and sync everything to Google Sheets. Perfect for recruiters, sales teams, and networkers.",
    live: "https://recurio.qopo.app/",
    repo: "https://github.com/ShribasPanja/recurio",
  },
  {
    src: "/images/inputBot.png",
    title: "Input Bot",
    description:
      "A rust and Tauri based desktop application that automates repetitive tasks by simulating keyboard and mouse inputs based on user-defined scripts. also records user actions for easy script creation.",
    live: "https://github.com/ShribasPanja/inputBot",
    repo: "https://github.com/ShribasPanja/inputBot",
  },
  {
    src: "/images/swagsy.png",
    title: "Swagsy",
    description:
      "Discover Free Swags & Rewards for Students Explore free swag opportunities from top tech companies",
    live: "https://swagsy.qopo.app",
    repo: "https://github.com/ShribasPanja/swagsy",
  },
];

export default function Boxes() {
  const container = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  useGSAP(() => {
    const images = imageRefs.current;
    const texts = textRefs.current;

    if (
      !container.current ||
      images.some((img) => img === null) ||
      texts.some((text) => text === null)
    ) {
      return;
    }

    images.forEach((img, i) => {
      if (!img || !texts[i]) return;

      gsap.set(img, {
        clipPath:
          i === 0
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        zIndex: images.length - i,
      });

      gsap.set(texts[i], {
        opacity: i === 0 ? 1 : 0,
        y: 30,
      });
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: `+=${images.length * 1000}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (images.length - 1));
          highlightNav(index);
        },
      },
    });

    tlRef.current = tl;

    for (let i = 0; i < images.length - 1; i++) {
      const currentImg = images[i];
      const nextImg = images[i + 1];
      const currentText = textRefs.current[i];
      const nextText = textRefs.current[i + 1];

      tl.to(currentImg, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power2.inOut",
        duration: 1,
      })
        .to(
          currentText,
          {
            opacity: 0,
            y: -30,
            ease: "power2.out",
            duration: 1,
          },
          "<"
        )
        .to(
          nextImg,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power2.inOut",
            duration: 1,
          },
          "<"
        )
        .to(
          nextText,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 1,
            onStart: () => {
              const split = SplitText.create(nextText, {
                type: "words, chars",
              });
              gsap.from(split.chars, {
                duration: 0.5,
                y: 60,
                autoAlpha: 0,
                stagger: 0.015,
                ease: "power2.out",
              });
            },
          },
          "<+0.5"
        );
    }

    function highlightNav(activeIndex: number) {
      imagesList.forEach((_, i) => {
        const el = document.getElementById(`nav-btn-${i}`);
        if (el) {
          el.classList.toggle("text-white", i === activeIndex);
          el.classList.toggle("text-[3.5vw]", i === activeIndex);
          el.classList.toggle("opacity-100", i === activeIndex);
          el.classList.toggle("text-gray-400", i !== activeIndex);
          el.classList.toggle("text-[3vw]", i !== activeIndex);
          el.classList.toggle("opacity-50", i !== activeIndex);
        }
      });
    }
  }, []);

  useGSAP(() => {
    setTimeout(() => {
      const firstText = textRefs.current[0];
      if (firstText) {
        const split = SplitText.create(firstText, {
          type: "words, chars",
        });

        gsap.from(split.chars, {
          duration: 0.6,
          y: 50,
          autoAlpha: 0,
          stagger: 0.02,
          ease: "power2.out",
        });
      }
    }, 1000);
  }, []);

  const goToProject = (index: number) => {
    if (!tlRef.current?.scrollTrigger) return;

    const scrollTrigger = tlRef.current.scrollTrigger;
    const totalScroll = scrollTrigger.end - scrollTrigger.start;
    const sectionScroll = totalScroll / (imagesList.length - 1);
    const targetScroll = scrollTrigger.start + index * sectionScroll;

    scrollTrigger.scroll(targetScroll);
  };

  return (
    <section className="w-full relative">
      <div className="relative">
        <div
          ref={container}
          className="sticky top-0 min-h-screen w-full flex items-center justify-center overflow-hidden bg-white"
        >
          <div className="relative w-full h-full">
            {imagesList.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <Image
                  src={item.src}
                  alt={`img-${i}`}
                  className="w-full h-full object-cover brightness-50"
                  fill
                  sizes="100vw"
                  priority={i === 0}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center sm:justify-start sm:pl-12">
                  <div
                    ref={(el) => {
                      textRefs.current[i] = el;
                    }}
                    className="text-white max-w-[90%] sm:max-w-[50%] text-center sm:text-left"
                  >
                    <h2
                      className={`text-[9vw] sm:text-[5vw] font-bold mb-4 drop-shadow-xl split ${poetsen.className}`}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={`text-[4vw] sm:text-[1.5vw] split ${poetsen.className}`}
                    >
                      {item.description}
                    </p>
                    <br />
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mt-2 items-center sm:items-start">
                      <a
                        href={item.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-white underline hover:text-blue-300 transition-all duration-300 text-[4vw] sm:text-[2vw] ${poetsen.className}`}
                      >
                        Go Live
                      </a>
                      <a
                        href={item.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-white underline hover:text-blue-300 transition-all duration-300 text-[4vw] sm:text-[2vw] ${poetsen.className}`}
                      >
                        Repository
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-25 right-8 z-30 flex flex-col gap-2 items-end">
              {imagesList.map((item, i) => (
                <p
                  key={i}
                  id={`nav-btn-${i}`}
                  onClick={() => goToProject(i)}
                  className={`cursor-pointer font-bold transition-all duration-300 text-[3vw] text-gray-400 hover:text-white hover:text-[3.5vw] ${poetsen.className} text-sm`}
                >
                  {item.title}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
