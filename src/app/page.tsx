"use client";
import Video from "@/components/video";
import { Comfortaa, Poetsen_One } from "next/font/google";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { use, useEffect, useRef } from "react";
import Boxes from "@/components/scrollclip";
import CardStack from "@/components/cardstack";
import Footer from "@/components/footer";
gsap.registerPlugin(useGSAP);

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
export default function Home() {
  const hero = useRef<HTMLDivElement>(null);
  const floatText = useRef<HTMLDivElement>(null);
  const floatText2 = useRef<HTMLDivElement>(null);
  const textSection = useRef<HTMLDivElement>(null);
  const projectmenu = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap
      .timeline({
        scrollTrigger: {
          trigger: hero.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(hero.current, {
        scale: 0.3,
        duration: 0.5,
      })
      .to(hero.current, {
        x: "0vw",
        y: "0vh",
        duration: 0.5,
      });
  }, [hero]);

  useGSAP(() => {
    if (!textSection.current) return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: textSection.current,
      start: "top top",
      end: "+=200vh",
      pin: false,
      scrub: true,
      anticipatePin: 1,
    });
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(SplitText);
    SplitText.create(floatText.current, {
      type: "chars",
      onSplit(self) {
        gsap.from(self.chars, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: floatText.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      },
    });
  }, [floatText]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(SplitText);

    if (floatText2.current) {
      floatText2.current.style.color = "#888";
      const split = new SplitText(floatText2.current, { type: "words" });
      gsap.fromTo(
        split.words,
        { color: "#888" },
        {
          color: "#273F4F",
          stagger: 0.15,
          scrollTrigger: {
            trigger: floatText2.current,
            start: "top 60%",
            end: "+=500vh",
            scrub: 2,
          },
        }
      );
    }
  }, [floatText2]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (projectmenu.current) {
      gsap.set(projectmenu.current, {
        transformOrigin: "left bottom",
      });

      gsap.fromTo(
        projectmenu.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectmenu.current,
            start: "top 90%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }
  }, [projectmenu]);

  return (
    <ReactLenis root>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-x-hidden">
        <section
          className="hero w-full h-screen border-[40px] border-white border-solid"
          ref={hero}
        >
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <div className="absolute inset-0 z-0">
              <Video />
            </div>

            <div className="z-10 absolute inset-0 p-4 flex justify-center items-center">
              <h1
                className={`text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-white text-center ${comfortaa.className}`}
              >
                Hello I'm Shribas
              </h1>
            </div>
          </div>
        </section>

        <section className="w-full " ref={textSection}>
          <div className="h-screen w-full border-[40px] border-white border-solid px-4 md:px-20 py-10 mb-[30vh]">
            <h1
              className={`text-[14vw] md:text-[9vw] font-bold ${poetsen.className} text-black`}
              ref={floatText}
            >
              Full Stack and Web3 Developer
            </h1>

            <p
              className={`mt-6 text-[4.5vw] md:text-[2vw] ${poetsen.className} text-[#273F4F] `}
              ref={floatText2}
            >
              I create stunning websites and applications that provide seamless
              user experiences. I specialize in building full-stack
              applications, integrating blockchain technology, developing smart
              contracts and DevOps solutions. My passion lies in crafting
              innovative solutions that push the boundaries of what's possible.
            </p>
          </div>
        </section>

        <section className="w-full bg-white">
          <div
            className="min-h-screen w-full bg-black flex items-center justify-center origin-bottom-left"
            ref={projectmenu}
          >
            <h2
              className={`text-white text-[8vw] font-bold ${comfortaa.className}`}
            >
              My projects
            </h2>
          </div>
          <Boxes />
        </section>
        <section className="relative min-h-screen text-white w-full overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#000000] via-[#596575] to-[#FFFFFF]" />
          <div className="relative z-20">
            <CardStack />
          </div>
        </section>
        <section className="w-full h-screen ">
          <Footer />
        </section>
      </div>
    </ReactLenis>
  );
}
