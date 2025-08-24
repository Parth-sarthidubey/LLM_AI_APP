
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import SummaryPage from './pages/SummaryPage';
import { sendMessage } from './services/api'; 

function App() {
    const [page, setPage] = useState('home');
    const [summary, setSummary] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [lastQuestion, setLastQuestion] = useState("Hello! How can I help with your repair today?");
    const [isReadyForSummary, setIsReadyForSummary] = useState(false);

    
    useEffect(() => {
        const savedSessionId = localStorage.getItem('sessionId');
        const initialBotMessage = { text: "Hello! How can I help with your repair today?", sender: 'bot', time: new Date() };
        
        if (savedSessionId) {
            setSessionId(savedSessionId);
            setMessages([{ text: "Welcome back! Let's continue.", sender: 'bot', time: new Date() }]);
        } else {
            setMessages([initialBotMessage]);
        }
    }, []);


    const handleSendMessage = async (userAnswer, isVoiceInput = false) => {
        setMessages(prev => [...prev, { text: userAnswer, sender: 'user', time: new Date() }]);
        
        const response = await sendMessage(lastQuestion, userAnswer, sessionId, isReadyForSummary, isVoiceInput);

        if (response.error) {
            setMessages(prev => [...prev, { text: response.followup, sender: 'bot', time: new Date() }]);
            return;
        }

        if (response.sessionId && !sessionId) {
            setSessionId(response.sessionId);
            localStorage.setItem('sessionId', response.sessionId);
        }

        let botMessageText;
        if (response.summary) {
            const summaryObject = { issue: response.summary, appointment: 'Details discussed during the conversation.' };
            setSummary(summaryObject);
            botMessageText = "Thank you! I've prepared a summary for you.";
            localStorage.removeItem('sessionId');
            setSessionId(null);
            setIsReadyForSummary(false);
        } else {
            botMessageText = response.areAllDetailsCaptured
                ? "I think I have all the details needed.\n\nIs there anything else you'd like to add before I create the summary?"
                : response.followup;
            setLastQuestion(botMessageText);
            setIsReadyForSummary(response.areAllDetailsCaptured);
        }

        const botMessage = {
            text: botMessageText,
            sender: 'bot',
            time: new Date(),
            audioData: response.audioData
        };
        setMessages(prev => [...prev, botMessage]);
    };

    const handleResetSession = () => {
        const initialQuestion = "Hello! How can I help with your repair today?";
        setMessages([{ text: initialQuestion, sender: 'bot', time: new Date() }]);
        setSessionId(null);
        setLastQuestion(initialQuestion);
        setIsReadyForSummary(false);
        setSummary(null);
        if (page !== 'chat') setPage('chat');
    };

    const renderPage = () => {
        switch (page) {
            case 'chat':
                return <ChatPage
                    messages={messages}
                    summary={summary}
                    onSendMessage={handleSendMessage}
                    onResetSession={handleResetSession}
                    setPage={setPage}
                />;
            case 'summary':
                return <SummaryPage summary={summary} />;
            case 'home':
            default:
                return <HomePage setPage={setPage} onNewChat={handleResetSession} />;
        }
    };

    return (
        <div className="h-screen bg-[#0d1a2e] text-gray-200 flex flex-col overflow-hidden">
            <Navbar page={page} setPage={setPage} />
            <AnimatePresence mode="wait">
                <motion.div key={page} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.35 }} className="flex-grow flex flex-col min-h-0">
                    {renderPage()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default App;