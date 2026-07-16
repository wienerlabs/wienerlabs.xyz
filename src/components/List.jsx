
import {useEffect, useState} from 'react';
import { gsap } from "gsap";
import { Power4} from 'gsap/gsap-core';
import { teamData } from '../data/teamData';
import MemberProfile from './Team/MemberProfile';
import PropTypes from 'prop-types';

function List({ onMemberClick }) {
  const [selectedMember, setSelectedMember] = useState(null);

  
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    if (onMemberClick) {
      onMemberClick(member);
    }
  };

  useEffect(() => {
    var rotate = 0;
    var diffrot = 0;
    const list = document.querySelectorAll('.listelem')

    list.forEach((el) => {
      el.addEventListener('mousemove', function(dets) {
        var diff = dets.clientY - el.getBoundingClientRect()
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(this.querySelector(".picture"), {
          opacity: 1,
          ease: Power4,
          top: diff,
          left: dets.clientX,
          rotate: gsap.utils.clamp(-20, 20, diffrot * 0.2),
        })
      })
      el.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector(".picture"), {opacity: 0, ease: Power4, duration: .5})
      })
      el.addEventListener('mousemove', function() {
        gsap.to(this.querySelector(".bluelayer"), {
          height: '100%',
          ease: Power4,
          duration: .1
        })
      })
      el.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector(".bluelayer"), {
          height: '0%',
          ease: Power4,
          duration: .1})
      })
    })
  }, [])

  return (
    <>
      <div className="list-container">
        {teamData.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleMemberClick(item)}
              className="listelem w-full px-4 py-4 sm:px-8 sm:py-6 lg:px-[4vh] lg:py-[6vh]
              flex justify-between items-center gap-4
              border-b-2 border-black sm:relative cursor-pointer
              hover:bg-black/5 transition-colors duration-300"
            >
              <div
                className="relative flex-1 flex flex-col sm:flex-row
                sm:items-center justify-between z-[3] gap-1 sm:gap-4"
              >
                <div className="left flex items-center gap-4 sm:gap-8 lg:gap-14">
                  <h3 className="hidden sm:inline-block opacity-25 text-2xl lg:text-5xl tabular-nums">{String(item.key).padStart(2, '0')}</h3>
                  <h1 className="text-black text-xl sm:text-2xl lg:text-4xl font-[Funnel] font-bold">{item.title}</h1>
                </div>
                <h3 className="font-[Funnel] text-sm sm:text-base lg:text-lg font-medium tracking-tight text-gray-600 sm:text-black">
                  {item.role}
                </h3>
              </div>
              <div
                className='picture w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0
                lg:opacity-0 lg:absolute z-[4] lg:top-1/2
                lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[15rem] lg:h-[15rem]
                overflow-hidden rounded-full'
              >
                {item.img ? (
                  <img src={item.img} className='w-full h-full object-cover' />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-white to-[#d4d4d4] flex items-center justify-center">
                    <span className="text-xl sm:text-2xl lg:text-5xl font-[Funnel] font-bold text-[#3d3a2f]">
                      {item.title.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <div className="hidden lg:inline-block bluelayer lg:absolute top-0 left-0 z-[2] w-full h-0 bg-black/5"></div>
            </div>
          )
        })}
      </div>
      {selectedMember && (
        <MemberProfile
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  )
}

List.propTypes = {
  onMemberClick: PropTypes.func
};

export default List
