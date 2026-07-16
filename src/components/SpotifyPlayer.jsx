import { useState } from 'react';
import PropTypes from 'prop-types';

function SpotifyPlayer({ spotifyTrackId }) {
    const [isMinimized, setIsMinimized] = useState(false);

    if (!spotifyTrackId) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ease-in-out ${
                isMinimized
                    ? 'w-16 h-16 rounded-full cursor-pointer'
                    : 'w-[400px] rounded-2xl'
            }`}
            style={{
                background: '#ffffff',
                border: '2px solid rgba(0, 0, 0, 0.8)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }}
        >
            {!isMinimized ? (
                <div className="relative w-full">
                    {/* Header with Minimize Button */}
                    <div className="flex items-center justify-between p-3 pb-2">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1DB954">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                            <span className="font-[Funnel] font-bold text-sm text-black">Now Playing</span>
                        </div>

                        {/* Minimize Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMinimized(true);
                            }}
                            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5" />
                            </svg>
                        </button>
                    </div>

                    {/* Spotify Embed Player */}
                    <div className="px-3 pb-3">
                        <iframe
                            style={{ borderRadius: '12px' }}
                            src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0&autoplay=1`}
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allowFullScreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        />
                    </div>
                </div>
            ) : (
                /* Minimized State - Expand Button */
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMinimized(false);
                    }}
                    className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform relative bg-white rounded-full"
                >
                    {/* Spotify icon */}
                    <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="#1DB954">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                </button>
            )}
        </div>
    );
}

SpotifyPlayer.propTypes = {
    spotifyTrackId: PropTypes.string
};

export default SpotifyPlayer;

