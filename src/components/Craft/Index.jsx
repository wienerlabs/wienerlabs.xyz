import Card from "../Card";
import Button from "../Button";
import {useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power4, } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

function Craft() {

    // const [isMobile, setIsMobile] = useState(false);
    const container = useRef(null);
    const textRef = useRef();

    // useEffect(() => {
    //     const handleResize = () => {
    //       setIsMobile(window.innerWidth <= 768);
    //     };
    
    //     // Attach the event listener
    //     window.addEventListener("resize", handleResize);
    
    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //       window.removeEventListener("resize", handleResize);
    //     };
    //   }, [isMobile]);

    useEffect(() => {
        var clutter = "";
        const para = document.querySelector(".texthead")
        const characters = para.textContent.split("")
        characters.forEach(function(e) {
            if(e === " ") clutter += `<span>&nbsp;</span>`
            clutter += `<span>${e}</span>`
        })
        para.innerHTML = clutter;
        gsap.set('.texthead span', {display: 'inline-block'});
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: ".ltext",
            start: "top 100%",
            end: "bottom 50%",
            scrub: .5,
            
            }
        });
        tl.from('.texthead span', {
            y: 100,
            opacity: 0,
            duration: 0.5,
            stagger: .1, 

        }) 
    },[]);

    useGSAP(() => {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                trigger: ".cards",
                start: "top 10%",
                scrub: 1,   
                }
            });
            tl.fromTo('.card', {
                y: 600,
                scale: .9,
            }, {
                y: 0,
                scale: 1.1,
                duration: .5,
                ease: Power4,
                transformOrigin: "bottom 50% -50",
            });
        })                           
    }, container );

   
  return (
    <div
        id="services"
        data-color="cyan"
        className="craft section w-full flex flex-col md:flex-row gap-8 md:gap-20 lg:gap-40 justify-between
          items-start md:items-center px-4 sm:px-8 py-8 relative"
    >
        <div className="ltext md:sticky md:top-[10%] left-0 w-full md:w-1/2">
            <p className="ptag font-[Funnel] text-sm sm:text-base lg:text-lg font-medium leading-relaxed">
                Wiener Labs builds infrastructure where smart contracts replace brokers.
                We transform yield sources into programmable tokens with embedded financial logic-
                managed by algorithms, not intermediaries. Every asset becomes tradeable,
                every yield becomes programmable.
            </p>
            <h1 className="texthead font-[Funnel] text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight mt-6 sm:mt-10 mb-6 sm:mb-10">The Bond Market for Everything</h1>
            <Link to="/projects">
                <Button bgColor="bg-none" text="OUR SERVICES" />
            </Link>
        </div>
        <div
            ref={container}
            className="right cards w-full md:w-1/2 flex items-center justify-center">
            <Card />
        </div>
    </div>
  )
}

export default Craft



