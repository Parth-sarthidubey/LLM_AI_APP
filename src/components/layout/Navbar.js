import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NissanLogo } from '../common/Icons';

const Navbar = ({ page, setPage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navItems = ["Home", "Chat", "Summary", "Support"];

    const handleMobileLinkClick = (item) => {
        setPage(item.toLowerCase());
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className="w-full bg-black/10 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <NissanLogo />
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map(item => (
                            <button key={item} onClick={() => setPage(item.toLowerCase())} className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                                {item}
                                {page === item.toLowerCase() && ( <motion.div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-blue-500" layoutId="underline" /> )}
                            </button>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 z-50 relative">
                            {isMobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 bg-[#0d1a2e]/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8"
                    >
                        {navItems.map(item => (
                            <button key={item} onClick={() => handleMobileLinkClick(item)} className="text-3xl font-bold text-gray-200 hover:text-blue-500 transition-colors">
                                {item}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;