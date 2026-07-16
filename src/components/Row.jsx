import solanaLogo from '../assets/images/chain-logos/solana.png';
import ethereumLogo from '../assets/images/chain-logos/ethereum.png';
import stellarLogo from '../assets/images/chain-logos/stellar.png';

import PropTypes from 'prop-types';

function Row({ translateClass, direction }) {

    const items = [
        { text: "Decentralized", image: solanaLogo },
        { text: "Transparent", image: ethereumLogo },
        { text: "Liquid", image: stellarLogo },
        { text: "Accessible", image: solanaLogo },
        { text: "Secure", image: ethereumLogo },
        { text: "Innovative", image: stellarLogo },
        { text: "Decentralized", image: solanaLogo },
        { text: "Transparent", image: ethereumLogo },
        { text: "Liquid", image: stellarLogo },
        { text: "Accessible", image: solanaLogo },
        { text: "Secure", image: ethereumLogo },
        { text: "Innovative", image: stellarLogo },
        { text: "Decentralized", image: solanaLogo },
        { text: "Transparent", image: ethereumLogo },
        { text: "Liquid", image: stellarLogo },
    ]

  return (
    <div
        className={`${translateClass} ${direction} row w-full flex
        items-center
        gap-4 sm:gap-6 lg:gap-8
        whitespace-nowrap mb-2`}
    >
        {items.map((item, index) => {
            return (
                <div
                    key={index}
                    className='elem flex items-center gap-4 sm:gap-6 lg:gap-8'
                >
                    <h1
                        className='font-[SansitaBold] text-3xl sm:text-5xl lg:text-7xl
                        leading-tight'
                    >
                        {item.text}
                    </h1>
                    <div className='imgdiv w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex-shrink-0 rounded-full overflow-hidden bg-white/90 flex items-center justify-center p-1 sm:p-1.5'>
                        <img
                            className='w-full h-full object-contain'
                            src={item.image}
                        />
                    </div>
                </div>
            )
        })}
    </div>
  )
}

Row.propTypes = {
    translateClass: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
  };

export default Row
