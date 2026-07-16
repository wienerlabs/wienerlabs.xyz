import muratImg from '../../assets/images/team-pfp/murat-turker.png';
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Para() {
    useEffect(() => {
        var clutter = "";
        const para = document.querySelector(".textpara")
        const characters = para.textContent.split("")
        characters.forEach(function(e) {

            clutter += `<span>${e}</span>`
        })
        para.innerHTML = clutter;
        gsap.set(".textpara span", {opacity: .1})
        gsap.to(".textpara span", {
            scrollTrigger: {
                trigger: ".para",
                start: "top 70%",
                end: "bottom 90%",
                scrub: 1,
            },
            opacity: 1,
            stagger: .03,

        })
    },[]);



  return (
    <div data-color="white" className="para section w-full flex items-center justify-center px-4 sm:px-8">
        <div className="text w-full sm:w-[80%] flex flex-col items-center sm:items-start justify-between">
            <div className='hidden w-[50%] sm:flex items-center justify-center mb-12'>
                <hr className='bg-zinc-400 w-[20%] h-[.3vh]' />
            </div>
            <h3 className='textpara w-full sm:w-[50%] text-[#3d3a2f] font-[Funnel] tracking-wide text-base sm:text-lg lg:text-xl font-medium text-center leading-relaxed sm:leading-[5vh] mb-10'>What Wiener Labs is building sits at the exact convergence institutional trade finance has been waiting for: programmable settlement, tokenized real-world assets, and a team disciplined enough to put it in front of regulated counterparties. That bench, that posture, is rare in this market. It is the rail I am advising them on.</h3>
            <div className="pers w-full sm:w-[50%] flex flex-col items-center justify-center gap-2">
                <div className="image w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-full">
                    <img src={muratImg} alt="Murat I. Türker" className="w-full h-full object-cover" />
                </div>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-medium text-center'>Murat I. Türker</h1>
                <h3 className='text-zinc-500 text-sm sm:text-base text-center'>Strategic Advisor · DP World Trade Finance, DIFC</h3>
            </div>
        </div>
    </div>
  )
}

export default Para
