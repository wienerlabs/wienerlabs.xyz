import { useRef} from 'react';
import { gsap } from "gsap";
import { Power2,} from 'gsap/gsap-core';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Real() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
            trigger: ".real",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            }
         }).to(".slide", {
            xPercent: -300,
            ease: Power2
         });
    }, container );

  return (
    <div
        id="about"
        data-color="salmon"
        ref={container}
        className="real section w-full px-4 sm:px-8 mt-16 sm:mt-32"
    >
      <div className="cont h-[300vh] sm:h-[400vh] relative">
        <div className="slides w-full h-screen lg:h-[130vh] overflow-hidden sticky top-0 left-0 flex">
            {/* 1st slide */}
            <div className="slide w-full flex items-center justify-center h-screen flex-shrink-0">
                <div className="text1 font-[Funnel] text-4xl sm:text-6xl lg:text-8xl leading-tight text-center lg:text-left">
                    <h1>Real Assets,</h1>
                    <h1>Real Value</h1>
                </div>
            </div>

            {/* 2nd slide */}
            <div className="slide w-full h-screen flex items-center justify-center flex-shrink-0 relative">
                <div className="w-[85%] sm:w-[70%] lg:w-[60%] text-center font-[Funnel] relative">
                    <h3 className="hidden lg:block font-[Funnel] lg:w-1/3 text-left font-semibold tracking-tight text-sm absolute top-0 left-0 z-[3] -translate-y-1/2 -translate-x-1/3">
                        We are on a mission to impact as many lives as possible and build a better company.
                    </h3>
                    <h1 className="font-semibold text-5xl sm:text-6xl lg:text-8xl leading-none text-black">$28M</h1>
                    <h3 className="text-sm sm:text-lg lg:text-2xl font-semibold leading-relaxed mt-2">
                        Total Market Value across Solana and Ethereum ecosystems.
                    </h3>
                </div>
            </div>

            {/* 3rd slide */}
            <div className="slide w-full h-screen flex items-center justify-center flex-shrink-0 relative">
                <div className="w-[85%] sm:w-[70%] lg:w-[60%] text-center font-[Funnel] relative">
                    <h3 className="hidden lg:block font-[Funnel] lg:w-1/3 text-left font-semibold tracking-tight text-sm absolute top-0 left-0 z-[3] -translate-y-1/2 -translate-x-1/3">
                        Our team of 16 senior developers and fintech experts accelerates innovation across blockchain and Web3.
                    </h3>
                    <h1 className="font-semibold text-5xl sm:text-6xl lg:text-8xl leading-none text-black">62</h1>
                    <h3 className="text-xl sm:text-2xl lg:text-4xl font-semibold leading-relaxed mt-2">Completed Projects</h3>
                </div>
            </div>

            {/* 4th slide */}
            <div className="slide w-full h-screen flex items-center justify-center relative flex-shrink-0">
                <div className="w-[85%] sm:w-[70%] lg:w-[60%] text-center font-[Funnel] relative">
                    <h1 className="font-semibold text-5xl sm:text-6xl lg:text-8xl leading-none text-black">87</h1>
                    <h3 className="text-xl sm:text-2xl lg:text-4xl font-semibold leading-relaxed mt-2">Fintech Projects <br/> Delivered.</h3>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Real;
