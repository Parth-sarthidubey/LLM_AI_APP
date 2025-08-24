export const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
export const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
}

/** 

let voices = [];
const synth = window.speechSynthesis;

// Function to get voices and populate the voices array
const loadVoices = () => {
    voices = synth.getVoices();
};

// The 'voiceschanged' event is fired when the list of voices has been loaded.
// Some browsers load it asynchronously.
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
}

export const speak = (text) => {
    if (!text) return;
    
    // Ensure any previous speech is stopped
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // If voices are not loaded yet, try loading them.
    if (voices.length === 0) {
        loadVoices();
    }

    // Find the best available voice
    // Prioritize Google, then Microsoft, then Apple, then any US English voice
    const bestVoice = 
        voices.find(voice => voice.name === 'Google US English') ||
        voices.find(voice => voice.name === 'Microsoft Zira - English (United States)') ||
        voices.find(voice => voice.name === 'Samantha') || // Common macOS voice
        voices.find(voice => voice.lang === 'en-US');

    if (bestVoice) {
        utterance.voice = bestVoice;
        console.log("Using voice:", bestVoice.name);
    } else {
        console.log("Using default browser voice.");
    }
    
    utterance.lang = 'en-US';
    synth.speak(utterance);
};*/


let currentAudio;

export const playAudio = (audioUrl) => {
    if (!audioUrl) return;

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(audioUrl);
    currentAudio.play().catch(e => console.error("Error playing audio:", e));
};
export const stopAudio = () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
};

// --- Audio Visualizer Logic ---
let audioContext;
let analyser;
let source;
let rafId;

export async function startVisualizer(onData) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Your browser does not support audio visualization.');
        return null;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    function loop() {
        rafId = requestAnimationFrame(loop);
        analyser.getByteFrequencyData(dataArray);
        onData([...dataArray]);
    }
    loop();

    return stream; 
}

export function stopVisualizer(stream) {
    cancelAnimationFrame(rafId);
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(console.error);
    }
}