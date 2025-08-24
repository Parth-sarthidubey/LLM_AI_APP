import React from 'react';
import { motion } from 'framer-motion';
import Portal from '../common/Portal';

const SummaryModal = ({ summaryData, setPage, onClose }) => {
    
    const handleConfirmSummary = () => {
        
        onClose(); 
        setPage('summary'); 
    };

    return (
        <Portal>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-900 border border-white/10 rounded-xl shadow-2xl w-full max-w-lg text-gray-200 overflow-hidden"
                >
                    <div className="p-6 border-b border-white/10"><h2 className="text-xl font-bold">Conversation Summary</h2></div>
                    
                    
                    <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        
                        {summaryData ? (
                            <p className="text-left w-full whitespace-pre-wrap">
                                {summaryData.issue}
                            </p>
                        ) : (
                            <div className="text-center">
                                <p className="text-gray-400">Summary is not available.</p>
                            </div>
                        )}
                    </div>
                  

                    <div className="p-4 bg-black/30 border-t border-white/10 flex justify-end items-center space-x-4">
                        <button onClick={onClose} className="px-5 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">Cancel</button>
                        <button onClick={handleConfirmSummary} disabled={!summaryData} className="bg-blue-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-blue-500 transition-colors disabled:bg-blue-400/50 disabled:cursor-not-allowed">
                            Confirm & View Page
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </Portal>
    );
};

export default SummaryModal;