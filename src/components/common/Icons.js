import React from 'react';
import { motion } from 'framer-motion';

export const NissanLogo = () => (
    <img
        src={`${process.env.PUBLIC_URL}/images/NISSAN_LOGO.png`}
        alt="Nissan Logo"
        className="h-8 w-auto"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x32/000000/FFFFFF?text=Nissan'; }}
    />
);

export const BotIcon = ({ isTyping = false }) => {
    const animation = {
        filter: [
            "drop-shadow(0 0 0px rgba(59, 130, 246, 0))",
            "drop-shadow(0 0 7px rgba(59, 130, 246, 0.6))",
            "drop-shadow(0 0 0px rgba(59, 130, 246, 0))"
        ]
    };

    return (
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                animate={isTyping ? animation : {}}
                transition={isTyping ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}}
            >
                <path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
                <path d="M3 12a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z" />
                <path d="M7 13h6v1H7v-1z" />
                <path d="M5 7a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm7 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
            </motion.svg>
        </div>
    );
};

export const UserIcon = () => <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0 shadow-md"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg></div>;
export const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
export const MicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
export const SummaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>;
export const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;


export const ResetIcon = () => (
   <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
</svg>
);

