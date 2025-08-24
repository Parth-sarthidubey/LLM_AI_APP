
const LAMBDA_ENDPOINT_URL = process.env.REACT_APP_API_URL;




export const sendMessage = async (question, answer, sessionId, isSessionClosed = false, isVoiceInput = false) => {
    try {
        const url = new URL(LAMBDA_ENDPOINT_URL);
        url.searchParams.append('question', question);
        url.searchParams.append('answer', answer);
        url.searchParams.append('isSessionClosed', isSessionClosed);
        url.searchParams.append('isVoiceInput', isVoiceInput);

        if (sessionId) {
            url.searchParams.append('sessionId', sessionId);
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        
        if (data.body && typeof data.body === 'string') {
            return JSON.parse(data.body);
        }
        return data;

    } catch (error) {
        console.error("Error communicating with the Lambda API:", error);
        return {
            error: true,
            followup: "Sorry, I'm having trouble connecting to the assistant.",
        };
    }
};