import React from 'react';
import { motion } from 'framer-motion';

const HomePage = ({ setPage }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="text-center p-6 z-10">
            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }} className="text-5xl md:text-7xl font-extrabold tracking-tight">Nissan <span className="text-blue-500">AI</span> Assistant</motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }} className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Your intelligent partner for vehicle support. Get instant help with repairs, maintenance, and appointments.</motion.p>
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(59, 130, 246, 0.5)" }} whileTap={{ scale: 0.95 }} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }} onClick={() => setPage('chat')} className="mt-12 px-10 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300">Start Conversation</motion.button>
        </div>
    </motion.div>
);

export default HomePage;
