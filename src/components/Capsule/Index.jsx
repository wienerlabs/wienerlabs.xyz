import Button from "../Button";
import {useRef} from 'react';
import { Link } from 'react-router-dom';
import cap1 from '../../assets/images/Deleuze.png';
import cap2 from '../../assets/images/USDC.png';
import norbertWiener from '../../assets/images/norbert-wiener.jpg';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { Power4} from 'gsap/gsap-core';
gsap.registerPlugin(ScrollTrigger);

 function Capsule() {
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: ".capsules",
            start: "top 60%",
            end: "bottom bottom",
            scrub: .5,
            }
        });
        tl.to(".capsule:nth-child(2)", {
            y: 0,
            marginTop:32,
            ease: Power4
        })
        tl.to(".capsule:nth-child(1)", {
            marginTop: 32,
            ease: Power4
        })
    }, container);


  return (
    <>
    <div id="projects" data-color="white" ref={container} className="capsules section w-full lg:h-[115vh]
        lg:overflow-hidden mb-16 sm:mb-32 flex flex-col lg:flex-row items-start lg:justify-between mt-16 sm:mt-32 lg:mt-60 px-4 sm:px-8 gap-8 lg:gap-40"
    >
        <div className="left w-full lg:w-1/3 h-full flex flex-col lg:justify-between py-6 sm:py-10 items-start">
            <h1 className="w-full sm:w-2/3 font-[Sansita] text-base sm:text-lg lg:text-xl leading-relaxed font-medium mb-6 lg:mb-0">
                Discover our cutting-edge
                blockchain and tokenization
                solutions across DeFi,
                infrastructure, and AI.
            </h1>
            <div className="heading">
                <h1 className="font-[SansitaReg] text-3xl sm:text-4xl lg:text-6xl py-3 sm:py-5 leading-tight">Explore <br/> Our Projects</h1>
                <Link to="/projects">
                    <Button bgColor="bg-white" text="VIEW ALL PROJECTS" />
                </Link>
            </div>
        </div>
        <div className="right font-[SansitaReg] mt-6 sm:mt-10 w-full lg:w-2/3 space-y-8 sm:space-y-10 h-full flex flex-col lg:flex-row items-center lg:items-start justify-start gap-8 lg:gap-20">
            {/* 1st capsule - Wiener Labs Mission */}
            <div
                className="capsule flex flex-col items-center gap-4 p-4 sm:p-6 lg:-rotate-[16deg] lg:translate-y-10
                rounded-full border-[1px] border-black w-full max-w-sm lg:max-w-none">
                <div className="image w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden">
                    <img className="h-full w-full object-cover" src={cap1} />
                </div>
                <div className="text text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-6 sm:mt-10 leading-relaxed">
                    <h3>Smart Contracts <br/>
                        Replace Brokers: <br/> Algorithms Over <br/> Intermediaries
                    </h3>
                </div>
                <span className="bg-black text-white px-4 rounded-full text-sm sm:text-base py-2 sm:py-3 mb-6 sm:mb-10 mt-6 sm:mt-10 font-semibold">Our Mission</span>
            </div>
            {/* 2nd capsule - Wiener Labs Overview */}
            <div
                className="capsule flex flex-col items-center gap-4 p-4 sm:p-6 lg:-rotate-[16deg] lg:translate-y-40
                rounded-full border-[1px] border-black w-full max-w-sm lg:max-w-none"
            >
                <span className="bg-black text-white px-4 rounded-full text-sm sm:text-base py-2 sm:py-3 mb-4 sm:mb-6 mt-6 sm:mt-10 font-semibold">80+ Projects</span>

                <div className="text text-center text-lg sm:text-xl lg:text-2xl flex flex-col gap-4 sm:gap-6 mb-4 sm:mb-6 font-semibold leading-relaxed">
                    <h3>Building the Future <br/>
                        of Web3 & <br/>RWA Tokenization
                    </h3>
                    <h4 className="font-[Sansita] text-sm sm:text-base font-medium leading-relaxed text-zinc-500">DeFi, Security, <br/> Infrastructure, AI & <br/>
                        Blockchain Solutions
                    </h4>
                </div>
                <div className="image w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden">
                    <img className="h-full w-full object-cover" src={cap2} />
                </div>
            </div>
        </div>
    </div>

    {/* Name Origin Section - Norbert Wiener */}
    <div data-color="white" className="name-origin section w-full py-32 sm:py-48 lg:py-64 px-4 sm:px-8">
        <div className="w-full max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="mb-6 sm:mb-10">
                <h2 className="font-[SansitaReg] text-2xl sm:text-3xl lg:text-5xl leading-tight mb-3">
                    Name Origin
                </h2>
                <div className="w-12 sm:w-16 h-1 bg-black"></div>
            </div>

            {/* Content - Text first on mobile */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                {/* Text Section - Always first on mobile */}
                <div className="w-full lg:w-1/2 order-1">
                    <h3 className="font-[SansitaBold] text-xl sm:text-2xl lg:text-3xl text-black mb-2">
                        Norbert Wiener
                    </h3>
                    <p className="font-[Sansita] text-sm sm:text-base text-gray-700 mb-4">
                        (1894-1964)
                    </p>
                    <p className="font-[Sansita] text-sm sm:text-base lg:text-lg leading-relaxed text-black mb-4">
                        Norbert Wiener was the founder of <span className="font-[SansitaBold]">cybernetics</span> and
                        a pioneer of <span className="font-[SansitaBold]">system theory</span>. His groundbreaking work
                        laid the foundation for understanding complex systems, automation, and information flow.
                    </p>
                    <p className="font-[Sansita] text-sm sm:text-base lg:text-lg leading-relaxed text-black">
                        <span className="font-[SansitaBold]">Wiener Labs</span> adopted this name with a vision to
                        automate complex systems and transfer data flow to decentralized infrastructures.
                    </p>
                </div>

                {/* Image Section - Small on mobile */}
                <div className="w-full lg:w-1/2 order-2 flex justify-center lg:justify-end">
                    <div className="relative w-32 h-40 sm:w-40 sm:h-52 lg:w-64 lg:h-80 rounded-xl overflow-hidden border border-black shadow-lg">
                        <img
                            src={norbertWiener}
                            alt="Norbert Wiener"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3">
                            <p className="font-[Sansita] text-white text-xs sm:text-sm">Norbert Wiener</p>
                            <p className="font-[Sansita] text-white/80 text-[10px] sm:text-xs">Founder of Cybernetics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Capsule

