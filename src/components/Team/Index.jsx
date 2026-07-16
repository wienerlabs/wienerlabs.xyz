import List from "../List";
import Button from "../Button";
import { useState, useRef } from "react";
import TeamFullPage from "./TeamFullPage";
import summaryImage from "../../assets/images/summary.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function Team() {
  const [showModal, setShowModal] = useState(false);
  const summaryRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      summaryRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: summaryRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <div
      id="team"
      data-color="white"
      className="team section font-[Funnel] py-20"
    >
      <div className="head1">
        <h1 className="text-5xl sm:text-6xl text-center tracking-tight">
          Our Team
        </h1>
      </div>
      <div className="list mt-10 w-full px-8">
        <List />
        <div className="flex items-center justify-center py-20">
          {/* <div onClick={() => setShowModal(true)}>
            <Button bgColor="bg-white" text="VIEW ALL TEAM MEMBERS" />
          </div> */}
        </div>

        {/* Wiener Labs Summary Section */}
        <div ref={summaryRef} className="w-full max-w-6xl mx-auto px-4 pb-20">
          <div className="relative rounded-2xl overflow-hidden border-2 border-black shadow-2xl">
            <img
              src={summaryImage}
              alt="Wiener Labs Summary - Technology Company Operating Under Software Laboratory Model"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
      {showModal && <TeamFullPage onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Team;
