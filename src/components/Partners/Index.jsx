import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Power4 } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
import {
  partnersData,
  capabilityAreas,
  positioningStatement,
  whyThisMatters,
} from '../../data/partnersData';

gsap.registerPlugin(ScrollTrigger);

function Partners() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.partner-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: Power4.easeOut,
        scrollTrigger: {
          trigger: '.partners-grid',
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      '.capability-pill',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: Power4.easeOut,
        scrollTrigger: {
          trigger: '.capability-strip',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      '.positioning-quote',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: Power4.easeOut,
        scrollTrigger: {
          trigger: '.positioning-quote',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      '.why-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: Power4.easeOut,
        scrollTrigger: {
          trigger: '.why-matters',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, container);

  return (
    <div
      id="partners"
      data-color="lime"
      ref={container}
      className="partners section w-full px-4 sm:px-8 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-[2px] bg-black"></div>
            <span className="font-[Sansita] text-sm sm:text-base font-semibold tracking-widest uppercase">
              Selected Experience
            </span>
          </div>
          <h2 className="font-[SansitaReg] text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6 sm:mb-8">
            Partners &<br />
            Collaborations
          </h2>
          <p className="font-[Sansita] text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed font-medium">
            Wiener Labs operates at the intersection of blockchain
            infrastructure and enterprise deployment, extending our technical
            delivery through a global communication network spanning Web3
            leaders, crypto exchanges, and RWA-focused institutions.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="partners-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-32">
          {partnersData.map((partner) => (
            <div
              key={partner.id}
              className="partner-card bg-white border-2 border-black rounded-2xl p-6 sm:p-8
                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-[Sansita] font-semibold tracking-widest uppercase">
                  {partner.category}
                </span>
                {partner.logo && (
                  <div className="shrink-0 h-10 sm:h-12 flex items-center justify-end">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="h-10 sm:h-12 w-auto max-w-[140px] object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                {partner.logos && (
                  <div className="shrink-0 flex items-center gap-2 flex-wrap justify-end">
                    {partner.logos.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${partner.name} logo ${i + 1}`}
                        className="h-7 sm:h-8 w-auto max-w-[80px] object-contain"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </div>
              <h3 className="font-[SansitaBold] text-2xl sm:text-3xl mb-2 leading-tight">
                {partner.name}
              </h3>
              <p className="font-[Sansita] text-sm sm:text-base text-gray-600 italic mb-4">
                {partner.subtitle}
              </p>
              <p className="font-[Sansita] text-sm sm:text-base leading-relaxed mb-5 flex-grow">
                {partner.description}
              </p>
              <ul className="space-y-2 pt-4 border-t border-black/10">
                {partner.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-[Sansita] text-xs sm:text-sm"
                  >
                    <span className="text-black mt-[2px] font-[SansitaBold]">-</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Capability Strip */}
        <div className="capability-strip mb-20 sm:mb-32">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-12 sm:w-16 h-[2px] bg-black"></div>
            <span className="font-[Sansita] text-sm sm:text-base font-semibold tracking-widest uppercase">
              Strategic Capability Areas
            </span>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {capabilityAreas.map((area, i) => (
              <div
                key={i}
                className="capability-pill font-[SansitaBold] text-sm sm:text-lg lg:text-xl
                  bg-black text-white px-5 sm:px-7 py-3 sm:py-4 rounded-full
                  border-2 border-black"
              >
                {area}
              </div>
            ))}
          </div>
        </div>

        {/* Positioning Statement */}
        <div className="positioning-quote relative max-w-5xl mx-auto mb-20 sm:mb-32">
          <div className="absolute -top-8 -left-4 sm:-top-12 sm:-left-8 font-[SansitaBold] text-8xl sm:text-[12rem] text-black/10 leading-none select-none pointer-events-none">
            &ldquo;
          </div>
          <blockquote className="relative font-[SansitaReg] text-xl sm:text-3xl lg:text-4xl leading-relaxed text-center px-4 sm:px-12 py-8">
            {positioningStatement}
          </blockquote>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-10 h-[2px] bg-black"></div>
            <span className="font-[Sansita] text-sm sm:text-base font-semibold tracking-widest uppercase">
              Positioning
            </span>
            <div className="w-10 h-[2px] bg-black"></div>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="why-matters">
          <div className="flex items-center gap-3 mb-8 sm:mb-10 justify-center">
            <div className="w-12 sm:w-16 h-[2px] bg-black"></div>
            <span className="font-[Sansita] text-sm sm:text-base font-semibold tracking-widest uppercase">
              Why This Matters
            </span>
            <div className="w-12 sm:w-16 h-[2px] bg-black"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyThisMatters.map((item, i) => (
              <div
                key={i}
                className="why-card bg-white border-2 border-black rounded-2xl p-5 sm:p-6 text-center
                  hover:bg-black hover:text-white transition-colors duration-300 group cursor-default"
              >
                <p className="font-[Sansita] text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 group-hover:text-white/70 mb-2 transition-colors duration-300">
                  {item.label}
                </p>
                <p className="font-[SansitaBold] text-base sm:text-xl lg:text-2xl leading-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partners;
