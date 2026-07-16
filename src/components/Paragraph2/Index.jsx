import superteamTrImg from '../../assets/images/superteam-tr.png';
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



function Para2() {
    useEffect(() => {
        var clutter = "";
        const para = document.querySelector(".textpara2")
        const characters = para.textContent.split("")
        characters.forEach(function(e) {

            clutter += `<span>${e}</span>`
        })
        para.innerHTML = clutter;
        gsap.set(".textpara2 span", {opacity: .1})
        gsap.to(".textpara2 span", {
            scrollTrigger: {
                trigger: ".para2",
                start: "top 60%",
                end: "bottom 90%",
                scrub: 1,
            },
            opacity: 1,
            stagger: .03,
        })
    },[]);
  return (
    <div data-color="white" className="para2 section w-full flex items-center mt-16 sm:mt-32 px-4 sm:px-8 justify-center">
        <div className="text w-full sm:w-[80%] flex flex-col items-center sm:items-end justify-center">
            <div className='hidden w-[40%] sm:flex items-center justify-center mb-12'>
                <hr className='bg-zinc-400 w-[20%] h-[.3vh]' />
            </div>
            <h3 className='textpara2 w-full sm:w-[40%] text-[#3d3a2f] font-[Funnel] text-base sm:text-lg lg:text-xl font-medium text-center tracking-wide leading-relaxed sm:leading-[5vh] mb-10'>Wiener Labs is the kind of builder profile we want active in the Solana ecosystem. Disciplined engineering, real on-chain product, and a team that pulls regional talent into global rails. They show up, they ship, and they bring others with them.</h3>
            <div className="pers w-full sm:w-[40%] flex flex-col items-center justify-center gap-2">
                <div className="image w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-full bg-white flex items-center justify-center">
                    <img src={superteamTrImg} alt="Superteam TR" className="w-full h-full object-contain scale-125" />
                </div>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-medium text-center'>Superteam TR</h1>
                <h3 className='text-zinc-500 text-sm sm:text-base text-center'>Solana Talent Layer · Türkiye Chapter</h3>
            </div>
        </div>
    </div>
  )
}

export default Para2
