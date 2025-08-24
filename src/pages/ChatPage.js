import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { recognition, playAudio, stopAudio, startVisualizer, stopVisualizer } from '../services/speech'; 
import { BotIcon, UserIcon, SendIcon, MicIcon, SummaryIcon} from '../components/common/Icons';
import TypingIndicator from '../components/chat/TypingIndicator';
import SummaryModal from '../components/summary/SummaryModal';
import VoiceWaveform from '../components/chat/VoiceWaveform';

const ChatPage = ({ messages, summary, onSendMessage, onResetSession, setPage }) => {
    const [inputValue, setInputValue] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [audioData, setAudioData] = useState([]);
    
    const mediaStreamRef = useRef(null);
    const chatEndRef = useRef(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (summary) {
            setTimeout(() => setShowSummaryModal(true), 1000);
        }
    }, [summary]);
    

    useEffect(() => {
        
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (messages.length === 0) return;
        const lastMessage = messages[messages.length - 1];

        if (lastMessage.sender === 'user') {
            setIsBotTyping(true);
        } else {
            setIsBotTyping(false);
            if (lastMessage.audioData) {
                const audioBytes = atob(lastMessage.audioData);
                const byteNumbers = new Array(audioBytes.length);
                for (let i = 0; i < audioBytes.length; i++) {
                    byteNumbers[i] = audioBytes.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const audioBlob = new Blob([byteArray], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                playAudio(audioUrl);
            }
        }
    }, [messages]);
    
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isBotTyping]);

  
    useEffect(() => {
        return () => {
            stopAudio();
        };
    }, []);

    const handleTextSend = () => {
        if (inputValue.trim()) {
            stopAudio();
            onSendMessage(inputValue.trim(), false);
            setInputValue('');
        }
    };

    const handleVoiceInput = async () => {
        if (isListening) {
            recognition.stop();
            return;
        }
        stopAudio();
        if (!recognition) return alert("Voice recognition not supported.");
        
        try {
            const stream = await startVisualizer(setAudioData);
            mediaStreamRef.current = stream;
            setIsListening(true);
            recognition.start();

            recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                setInputValue(finalTranscript || interimTranscript);
                if (finalTranscript) {
                    stopAudio();
                    onSendMessage(finalTranscript.trim(), true);
                    setInputValue('');
                }
            };

            recognition.onerror = (event) => console.error("Speech recognition error:", event.error);
            recognition.onend = () => {
                setIsListening(false);
                if (mediaStreamRef.current) {
                    stopVisualizer(mediaStreamRef.current);
                    mediaStreamRef.current = null;
                }
            };
        } catch (error) {
            alert("Microphone access is required for voice input.");
        }
    };

    const isConversationOver = !!summary;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
            <div className="container mx-auto flex-grow flex flex-col w-full max-w-4xl p-0 md:p-4 h-full">
                <div className="bg-gray-900/40 border border-white/10 rounded-lg shadow-2xl flex-grow flex flex-col relative overflow-hidden backdrop-blur-xl">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                        <button onClick={onResetSession} className="bg-white/10 hover:bg-white/20 text-gray-200 font-semibold py-2 px-4 rounded-lg flex items-center transition-colors shadow-sm">New Chat</button>
                        <h2 className="font-bold text-lg text-gray-200">AI Repair Assistant</h2>
                        <button onClick={() => setShowSummaryModal(true)} disabled={!summary} className="bg-white/10 hover:bg-white/20 text-gray-200 font-semibold py-2 px-4 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"><SummaryIcon /> Summary</button>
                    </div>
                    <div className="flex-grow p-4 space-y-4 overflow-y-auto min-h-0 custom-scrollbar">
                        {messages.map((msg, index) => (
                             <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                 {msg.sender === 'bot' && <BotIcon />}
                                 <div className={`max-w-md min-w-24 p-3 rounded-lg shadow-md ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'}`}>
                                     <p className="whitespace-pre-wrap">{msg.text}</p>
                                     <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>{new Date(msg.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                 </div>
                                 {msg.sender === 'user' && <UserIcon />}
                             </motion.div>
                        ))}
                        {isBotTyping && <TypingIndicator />}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-4 border-t border-white/10 bg-black/20 flex-shrink-0">
                        <div className="flex items-center space-x-3">
                            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleTextSend()} placeholder={isConversationOver ? "Conversation ended." : "Type your message..."} className="flex-grow p-3 bg-gray-800 border border-gray-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50" disabled={isBotTyping || isConversationOver} />
                            <button onClick={handleTextSend} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md disabled:opacity-50" disabled={isBotTyping || isConversationOver || !inputValue.trim()}><SendIcon /></button>
                            <button onClick={handleVoiceInput} className={`p-3 rounded-full transition-colors shadow-md ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} disabled:opacity-50`} disabled={isBotTyping || isConversationOver}><MicIcon /></button>
                        </div>
                    </div>
                    <AnimatePresence>{isListening && <VoiceWaveform audioData={audioData} />}</AnimatePresence>
                </div>
            </div>
            <AnimatePresence>
                {showSummaryModal && (<SummaryModal summaryData={summary} setPage={setPage} onClose={() => setShowSummaryModal(false)} />)}
            </AnimatePresence>
        </motion.div>
    );
};

export default ChatPage;