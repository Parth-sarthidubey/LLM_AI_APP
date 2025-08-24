import React from 'react';
import { motion } from 'framer-motion';

const VoiceWaveform = ({ audioData }) => {
    const maxBars = 32; // number of bars for a cleaner look
    const barsToShow = audioData.slice(0, maxBars);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
        >
            <div className="flex items-end justify-center h-24 space-x-px">
                {barsToShow.map((value, i) => {
                    const height = (value / 255) * 90 + 2; 
                    return (
                        <motion.div
                            key={i}
                            className="bg-blue-500 rounded-full w-1" 
                            animate={{ height: `${height}px` }}
                            transition={{ type: 'spring', stiffness: 700, damping: 50 }}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
};

export default VoiceWaveform;