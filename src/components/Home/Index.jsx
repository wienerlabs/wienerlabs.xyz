import Row from '../Row'
import {useEffect, useState, useRef} from 'react';
import {motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { gsap } from "gsap";
import styles from './Style.module.css';
import { Power2, Power4 } from 'gsap/gsap-core';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { BiMenu, BiX } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import wienerLogo from '../../assets/images/wiener-logo.png';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
    { name: "Services", target: "services", isPage: false },
    { name: "About", target: "about", isPage: false },
    { name: "Projects", target: "/projects", isPage: true },
    { name: "Team", target: "team", isPage: false },
    { name: "Partners", target: "partners", isPage: false },
    { name: "Ambassadors", target: "ambassadors", isPage: false },
    { name: "Contact", target: "contact", isPage: false }
];

function Home() {
    const navigate = useNavigate();
    const container = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        var clutter = "";
        const para = document.querySelector(".toptext")
        const characters = para.textContent.split("")
        characters.forEach(function(e) {
            clutter += `<span>${e}</span>`
        })
        para.innerHTML = clutter;
        gsap.set(".toptext span", {opacity: .1})
        gsap.to(".toptext span", {
            scrollTrigger: {
                trigger: ".home",
                start: "top 50%",
                end: "bottom 90%",
                scrub: 1,
            },
            opacity: 1,
            stagger: .03,
        })
    },[]);

    useGSAP(() => {
        gsap.set(".slidesm", {scale: 5});

        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: ".home",
            start: "top top",
            end: "bottom bottom",
            scrub: .5,
            }
         });
         tl.to(".vdodiv", {
            clipPath: 'circle(0% at 50% 50%)',
            ease: Power4,
          }, "start")
          tl.to(".slidesm", {
            scale: 1,
            ease: Power2,
         }, 'start');
         tl.to(".lft", {
            xPercent: -10,
            stagger: .03,
            ease: Power4,
            duration: 1,
         }, 'start');
         tl.to(".rgt", {
            xPercent: 10,
            stagger: .03,
            ease: Power4,
            duration: 1,
         }, 'start');
    }, container )

    const {scrollY} = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if(latest > previous) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const handleNavClick = (item) => {
        if (item.isPage) {
            navigate(item.target);
        } else {
            const element = document.getElementById(item.target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
    <div ref={container} data-color="black" className="home section w-full h-[200vh] relative  ">
        <div className='w-full sticky top-0 left-0 '>
            {/* navbar */}
            <motion.div
                variants={{
                visible: {y: 0},
                hidden: {y: "-100%"},
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{duration: 0.35, ease: "easeInOut"}}
                className="section w-[100vw] sm:w-full px-6 fixed top-0 left-0 z-[9]"
            >
                <div className="w-full flex sm:flex items-center justify-between  ">
                    <div className="logo w-[12vh] h-[12vh] sm:w-[16vh] sm:h-[10vh] cursor-pointer z-[9] flex items-center">
                        <img src={wienerLogo} alt="WIENER" className="h-[6vh] sm:h-[7vh] w-auto object-contain" />
                    </div>
                    <div className="hidden md:flex gap-2 items-center z-[9] cursor-pointer ">
                        {NAV_ITEMS.map((item, index) => (
                            <h4
                                key={index}
                                onClick={() => handleNavClick(item)}
                                className={`${styles.links} h-[3vh] relative py[2.4vh] px-[2.2vh] text-center flex flex-col
                                font-[Funnel] text-[2.1vh] overflow-hidden font-medium leading-[2.5vh]`}
                            >
                                <a className={`atag ${styles.atag} relative`}>{item.name} </a>
                                <a className={`atag ${styles.atag} relative`}>{item.name} </a>
                            </h4>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden z-[9]">
                        {mobileMenuOpen ? (
                            <BiX
                                onClick={() => setMobileMenuOpen(false)}
                                className="cursor-pointer text-3xl"
                            />
                        ) : (
                            <BiMenu
                                onClick={() => setMobileMenuOpen(true)}
                                className="cursor-pointer text-2xl"
                            />
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[8] bg-black/95 flex flex-col items-center justify-center md:hidden"
                >
                    {NAV_ITEMS.map((item, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => {
                                setMobileMenuOpen(false);
                                if (item.isPage) {
                                    navigate(item.target);
                                } else {
                                    setTimeout(() => {
                                        const element = document.getElementById(item.target);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }, 300);
                                }
                            }}
                            className="font-[Funnel] font-bold text-white text-4xl py-4 hover:opacity-70 transition-colors"
                        >
                            {item.name}
                        </motion.button>
                    ))}
                </motion.div>
            )}

            <div className='btmtext absolute z-[4] bottom-[4%] left-[25%] text-center sm:text-start sm:bottom-[7%] sm:left-8 w-48 '>
                <h1 className='sm:text-[2vh] font-semibold'>
                    We tokenize real-world assets.
                    Infrastructure. DeFi. AI.
                    For institutional investors. Real liquidity.
                </h1>
            </div>
            {/* video div */}
            <div
                className={` vdodiv w-full h-screen absolute z-[3]
                top-0 left-0 overflow-hidden sm:overflow-visible ${styles.vdodiv}`}
            >
                <video
                    className="absolute w-full h-screen object-cover top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                >
                    <source src="/video/hero.webm" type="video/webm" />
                    <source src="/video/hero.mp4" type="video/mp4" />
                </video>
            </div>

            {/* marquee div */}
            <div
                className="marqueecontainer w-full h-screen
                relative overflow-hidden "
            >
                <div
                    className=' heading absolute  top-[12%] sm:top-[7%] left-1/2
                    -translate-x-1/2 w-72'
                >
                    <h2 className='toptext text-[2.2vh] font-[Funnel] tracking-wide font-medium text-center'>Transforming traditional assets into digital opportunities through blockchain innovation that is</h2>
                </div>

                <div
                    className='slidesm absolute scale-[5]  top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2 w-[90%]'
                >
                    <div className='row'>
                        <Row
                            translateClass="-translate-x-1/2"
                            direction="lft"
                        />
                        <Row
                            translateClass="-translate-x-2/3"
                            direction="rgt"
                        />
                        <Row
                            translateClass="-translate-x-1/4"
                            direction="lft"
                        />
                        <Row
                            translateClass="-translate-x-1/3"
                            direction="rgt"
                        />
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
