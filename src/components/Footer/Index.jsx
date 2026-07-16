import { Link } from 'react-router-dom';
import styles from './Style.module.css';
import { LuArrowUpRight, LuBookOpen, LuTrophy } from "react-icons/lu";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Button from  '../Button'

const SOCIAL_LINKS = [
  { name: "X", href: "https://x.com/wienerlabs", Icon: FaXTwitter },
  { name: "GitHub", href: "https://github.com/wienerlabs", Icon: FaGithub },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/wiener-labs", Icon: FaLinkedinIn },
  { name: "Paragraph", href: "https://paragraph.com/@wienerlabs", Icon: LuBookOpen },
  { name: "DoraHacks", href: "https://dorahacks.io/org/wienerlabs", Icon: LuTrophy },
];

function Footer() {
  return (
    <div id="contact" className="section w-full mt-16 sm:mt-24">
      <div className="topfoot bg-white pt-10 sm:pt-16 pb-10 sm:pb-16 flex flex-col md:flex-row items-start md:items-center justify-between px-4 sm:px-8">
        <div className="left w-full md:w-1/2 mb-6 md:mb-0">
          <div className="first font-[Funnel] text-2xl sm:text-3xl lg:text-5xl leading-tight mb-4 sm:mb-6">
            <h1>Discover Wiener Labs.</h1>
          </div>
          <Link to="/projects" className='inline-block px-4 py-3 bg-[--black] text-white'>
            <div className={`${styles.masker} flex items-center gap-2 overflow-hidden relative cursor-pointer`}>
              <span className={`${styles.spanMask} font-[Funnel] text-sm sm:text-base capitalize tracking-normal font-semibold`}>
                VIEW PROJECTS
              </span>
              <LuArrowUpRight className={`${styles.iconMask} text-lg sm:text-xl text-[#f5f19c]`} />
            </div>
          </Link>
        </div>

        <div className="right w-full md:w-1/2 flex items-start md:items-center justify-between">
          <div className="w-full md:w-2/3">
            <h3 className="text-sm sm:text-base lg:text-lg font-[Funnel] font-medium leading-relaxed">
              Wiener Labs is a technology company
              operating under a software laboratory model
              that enables the integration of Real World Assets (RWAs) into blockchain infrastructure.
              We develop tokenization infrastructures, decentralized finance (DeFi) protocols, and AI-powered automation tools.
            </h3>
          </div>
          <div className="hidden md:inline-block rght2 relative w-[100px] lg:w-[150px] h-[100px] lg:h-[150px]">
            <div className={`${styles.loopFoot}`}></div>
            <div className="icon w-[80px] lg:w-[120px] h-[80px] lg:h-[120px] rounded-full border-black border-[1px] p-6 lg:p-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-hidden">
              <div className="w-6 lg:w-10 h-6 lg:h-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <svg width="100%" height="100%" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0.703124C16 9.53968 8.83656 16.7031 0 16.7031" stroke="black" strokeWidth="2"></path>
                  <path d="M16 0.703124C16 9.53968 23.1634 16.7031 32 16.7031" stroke="black" strokeWidth="2"></path>
                  <path d="M16 0.703125L16 37.2746" stroke="currentColor" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="downfoot w-full h-fit bg-[var(--black)] px-4 sm:px-8 py-8 sm:py-16 lg:py-32">
        <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-6 sm:gap-4'>
          <div className='hidden md:inline-block'>
            {[
              { name: "Home", target: null },
              { name: "Services", target: "services" },
              { name: "About", target: "about" },
              { name: "Team", target: "team" },
              { name: "Contact", target: "contact" }
            ].map((item, index) => {
              return (
                <div
                  key={index}
                  className='pb-4 cursor-pointer hover:opacity-70 transition-opacity'
                  onClick={() => {
                    if (item.target) {
                      const element = document.getElementById(item.target);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <h3 className='font-[Funnel] text-[2.5vh] text-white font-semibold'>
                    {item.name}
                  </h3>
                </div>
              )
            })}
          </div>
          <div className='w-full sm:w-auto'>
            <h1 className='text-white pb-4 sm:pb-10 font-[Funnel] text-base sm:text-lg font-semibold'>Join our mailing list for the latest updates.</h1>
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6'>
              <input
                type="text"
                placeholder="Enter your email address"
                className="bg-[var(--light)] w-full sm:w-[280px] lg:w-[350px] h-12 px-4 text-sm sm:text-base"
              />
              <Button text="SUBSCRIBE" bgColor="bg-white" />
            </div>
          </div>
          <div className='hidden md:inline-block'>
            {[
              { name: "Projects", target: null, isLink: true, to: "/projects" },
              { name: "Newsroom", target: null },
              { name: "Resources", target: null },
              { name: "Careers", target: null },
              { name: "Contact", target: "contact" }
            ].map((item, index) => {
              if (item.isLink) {
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className='block pb-4 cursor-pointer hover:opacity-70 transition-opacity'
                  >
                    <h3 className='font-[Funnel] text-[2.5vh] text-white font-semibold'>
                      {item.name}
                    </h3>
                  </Link>
                )
              }
              return (
                <div
                  key={index}
                  className='pb-4 cursor-pointer hover:opacity-70 transition-opacity'
                  onClick={() => {
                    if (item.target) {
                      const element = document.getElementById(item.target);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  <h3 className='font-[Funnel] text-[2.5vh] text-white font-semibold'>
                    {item.name}
                  </h3>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-10 sm:mt-16 pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <span className="font-[Funnel] text-white/60 text-sm">Wiener Labs</span>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:opacity-60 transition-opacity font-[Funnel] text-sm"
              >
                <Icon className="text-base" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
