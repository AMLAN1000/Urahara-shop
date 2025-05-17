import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Track() {
    const context = useContext(myContext);
    const { mode } = context;
    
    // Anime-themed colors
    const animeColors = {
        primary: mode === 'dark' ? '#6B46C1' : '#9F7AEA', // Purple theme
        secondary: mode === 'dark' ? '#ED64A6' : '#F687B3', // Pink accent
        background: mode === 'dark' ? '#2D3748' : '#EDF2F7',
        text: mode === 'dark' ? '#F7FAFC' : '#2D3748',
        cardBg: mode === 'dark' ? '#4A5568' : '#FFFFFF',
    };
    
    return (
        <div style={{ 
            backgroundImage: mode === 'dark' 
                ? 'linear-gradient(to bottom right, #1A202C, #2D3748)' 
                : 'linear-gradient(to bottom right, #EDF2F7, #E2E8F0)',
            padding: '20px 0'
        }}>
            <section>
                <div className="container mx-auto px-5 md:py-5">
                    <h1 className="text-center text-3xl font-bold mb-8" 
                        style={{ 
                            color: animeColors.secondary,
                            fontFamily: "'Comic Sans MS', cursive, sans-serif",
                            textShadow: mode === 'dark' ? '0 0 10px rgba(237, 100, 166, 0.5)' : 'none'
                        }}>
                        Anime Collection
                    </h1>
                    
                    <div className="flex flex-wrap -m-4 text-center">
                        {/* Mecha Anime Card */}
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-xl border-gray-200 px-4 py-6 rounded-lg transition-all duration-300 transform hover:scale-105" 
                                style={{ 
                                    backgroundColor: animeColors.cardBg, 
                                    color: animeColors.text,
                                    borderColor: animeColors.primary,
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>
                                <svg className="w-12 h-12 mb-3 inline-block" 
                                    style={{ color: animeColors.primary }}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>

                                <h2 className="title-font font-bold text-lg mb-2"
                                    style={{ color: animeColors.secondary }}>
                                    Mecha Collection
                                </h2>
                                <p className="leading-relaxed">
                                    Limited edition apparel inspired by your favorite giant robot anime series. Perfect for mecha enthusiasts!
                                </p>
                            </div>
                        </div>
                        
                        {/* Fantasy Anime Card */}
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-xl border-gray-200 px-4 py-6 rounded-lg transition-all duration-300 transform hover:scale-105" 
                                style={{ 
                                    backgroundColor: animeColors.cardBg, 
                                    color: animeColors.text,
                                    borderColor: animeColors.primary,
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>
                                <svg className="w-12 h-12 mb-3 inline-block" 
                                    style={{ color: animeColors.primary }}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>

                                <h2 className="title-font font-bold text-lg mb-2"
                                    style={{ color: animeColors.secondary }}>
                                    Fantasy Realm
                                </h2>
                                <p className="leading-relaxed">
                                    Premium clothing featuring magical designs from isekai and fantasy anime worlds. Enchant your wardrobe!
                                </p>
                            </div>
                        </div>

                        {/* Shonen Anime Card */}
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-xl border-gray-200 px-4 py-6 rounded-lg transition-all duration-300 transform hover:scale-105" 
                                style={{ 
                                    backgroundColor: animeColors.cardBg, 
                                    color: animeColors.text,
                                    borderColor: animeColors.primary,
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>
                                <svg className="w-12 h-12 mb-3 inline-block" 
                                    style={{ color: animeColors.primary }}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>

                                <h2 className="title-font font-bold text-lg mb-2"
                                    style={{ color: animeColors.secondary }}>
                                    Shonen Spirit
                                </h2>
                                <p className="leading-relaxed">
                                    Battle-ready tees featuring your favorite action-packed anime heroes. Plus Ultra comfort for everyday adventures!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Track