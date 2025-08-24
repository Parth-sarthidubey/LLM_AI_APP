import React from 'react';
import { motion } from 'framer-motion';
import { BotIcon } from '../common/Icons';

const TypingIndicator = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-3 ml-2 mb-4">
        <BotIcon isTyping={true} />
        <div className="flex items-center space-x-1 p-3 bg-gray-700 rounded-lg shadow-md">
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-gray-400 rounded-full" />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-gray-400 rounded-full" />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
        </div>
    </motion.div>
);

export default TypingIndicator;
