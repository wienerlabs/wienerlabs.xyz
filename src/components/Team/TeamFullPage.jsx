import { useEffect, useState } from 'react';
import { gsap } from "gsap";
import { teamData } from '../../data/teamData';
import MemberProfile from './MemberProfile';
import PropTypes from 'prop-types';

function TeamFullPage({ onClose }) {
    const [selectedMember, setSelectedMember] = useState(null);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        gsap.fromTo('.modal-overlay', { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo('.modal-content', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 });
        gsap.fromTo('.team-card', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.3 });
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    const handleClose = () => {
        gsap.to('.modal-overlay', { opacity: 0, duration: 0.3, onComplete: onClose });
    };

    return (
        <>
            <div className="modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="modal-content bg-white w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-lg relative">
                    <button onClick={handleClose} className="sticky top-4 right-4 float-right z-10 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 font-bold text-2xl">×</button>
                    <div className="px-8 pt-16 pb-8 text-center">
                        <h1 className="font-[Funnel] font-bold text-5xl sm:text-7xl mb-4">Our Team</h1>
                        <p className="font-[Funnel] text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">Meet the talented individuals driving innovation at Wiener Labs. Our team of 13 experts brings together deep expertise in blockchain, AI, and financial technology.</p>
                    </div>
                    <div className="px-8 pb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {teamData.map((member) => (
                                <div
                                    key={member.id}
                                    onClick={() => setSelectedMember(member)}
                                    className="team-card bg-white border-2 border-black rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="relative h-64 overflow-hidden bg-gray-100">
                                        {member.img ? (
                                            <img src={member.img} alt={member.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-white to-[#d4d4d4] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                                <span className="text-5xl font-[Funnel] font-bold text-[#3d3a2f]">
                                                    {member.title.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-[Funnel] font-bold text-2xl mb-2">{member.title}</h3>
                                        <p className="font-[Funnel] text-lg text-white bg-black px-3 py-1 rounded-full inline-block mb-4">{member.role}</p>
                                        <p className="font-[Funnel] text-gray-700 text-sm mb-4 leading-relaxed">{member.bio}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {member.expertise.slice(0, 3).map((skill, index) => (
                                                <span key={index} className="font-[Funnel] text-xs bg-white text-black px-3 py-1 rounded-full border border-black">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white px-8 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div><h3 className="font-[Funnel] font-bold text-4xl sm:text-5xl mb-2">20+</h3><p className="font-[Funnel] text-lg text-gray-700">Team Members</p></div>
                            <div><h3 className="font-[Funnel] font-bold text-4xl sm:text-5xl mb-2">4</h3><p className="font-[Funnel] text-lg text-gray-700">Co-Founders</p></div>
                            <div><h3 className="font-[Funnel] font-bold text-4xl sm:text-5xl mb-2">8</h3><p className="font-[Funnel] text-lg text-gray-700">Years Exp.</p></div>
                            <div><h3 className="font-[Funnel] font-bold text-4xl sm:text-5xl mb-2">87</h3><p className="font-[Funnel] text-lg text-gray-700">Projects</p></div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedMember && (
                <MemberProfile
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </>
    );
}

TeamFullPage.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default TeamFullPage;

