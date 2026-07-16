import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Power4 } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
import { ambassadorsData, ambassadorsIntro } from '../../data/ambassadorsData';

gsap.registerPlugin(ScrollTrigger);

function Ambassadors() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.ambassador-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: Power4.easeOut,
        scrollTrigger: {
          trigger: '.ambassadors-grid',
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  }, container);

  return (
    <div
      id="ambassadors"
      data-color="lime"
      ref={container}
      className="ambassadors section w-full px-4 sm:px-8 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-[2px] bg-black"></div>
            <span className="font-[Funnel] text-sm sm:text-base font-semibold tracking-widest uppercase">
              Ambassadors
            </span>
          </div>
          <h2 className="font-[Funnel] text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6 sm:mb-8">
            On-the-ground
            <br />
            voices
          </h2>
          <p className="font-[Funnel] text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed font-medium">
            {ambassadorsIntro}
          </p>
        </div>

        {/* Ambassadors Grid */}
        <div className="ambassadors-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {ambassadorsData.map((amb) => {
            const initials = amb.name
              .replace(/[^a-zA-Z0-9]/g, '')
              .slice(0, 2)
              .toUpperCase();
            return (
              <a
                key={amb.id}
                href={amb.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="ambassador-card bg-white border-2 border-black rounded-2xl p-6 sm:p-8
                  hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                  flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7"
              >
                <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-black bg-gradient-to-br from-white to-[#d4d4d4] flex items-center justify-center">
                  {amb.img ? (
                    <img
                      src={amb.img}
                      alt={amb.handle}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-[Funnel] font-bold text-2xl sm:text-3xl text-[#3d3a2f]">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-[Funnel] font-semibold tracking-widest uppercase mb-3">
                    {amb.role}
                  </span>
                  <h3 className="font-[Funnel] font-bold text-2xl sm:text-3xl mb-1 leading-tight">
                    {amb.handle}
                  </h3>
                  <p className="font-[Funnel] text-sm sm:text-base leading-relaxed">
                    {amb.bio}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Ambassadors;
