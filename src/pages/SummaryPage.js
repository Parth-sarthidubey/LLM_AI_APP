import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EditIcon } from '../components/common/Icons';

const SummaryPage = ({ summary }) => {
    const [editedSummary, setEditedSummary] = useState(summary);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setEditedSummary(summary);
    }, [summary]);

    if (!summary) {
        return (
            <div className="flex-grow flex items-center justify-center text-gray-500">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">No Summary Available</h2>
                    <p>Please complete a chat session to generate a summary report.</p>
                </div>
            </div>
        );
    }

    const handleSave = () => {
       
        setIsEditing(false);
    };
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow container mx-auto p-6 text-gray-200">
            <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">Technician's Dashboard</h1>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative max-w-3xl mx-auto bg-gray-900/50 p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-blue-500">AI-Generated Work Order</h2>
                    {!isEditing && <button onClick={() => setIsEditing(true)} className="p-2 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors"><EditIcon /></button>}
                </div>
                <div className="space-y-6 text-gray-300">
                    <div>
                        <h3 className="font-semibold text-gray-100 mb-1">Reported Issue</h3>
                        {isEditing ? <textarea value={editedSummary.issue} onChange={(e) => setEditedSummary({...editedSummary, issue: e.target.value})} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 styled-textarea h-40 custom-scrollbar" /> : <p>{summary.issue}</p>}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-100 mb-1">Appointment Status</h3>
                        {isEditing ? <input value={editedSummary.appointment} onChange={(e) => setEditedSummary({...editedSummary, appointment: e.target.value})} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" /> : <p>{summary.appointment}</p>}
                    </div>
                </div>
                {isEditing && (
                    <div className="mt-8 flex justify-end space-x-4">
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">Cancel</button>
                        <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors">Save Changes</button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default SummaryPage;