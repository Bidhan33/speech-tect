import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only use this for development/demo purposes
});

const VoiceToTextQA = () => {
  const [transcript, setTranscript] = useState('');
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let recognition = null;

    if ('webkitSpeechRecognition' in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        setTranscript(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
      };
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      window.webkitSpeechRecognition.start();
    } else {
      window.webkitSpeechRecognition.stop();
    }
  };

  const askQuestion = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{"role": "user", "content": transcript}]
      });

      setAnswer(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error asking question:', error);
      setAnswer('Sorry, there was an error processing your question.');
    }
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcript: {transcript}</p>
      <button onClick={askQuestion}>Ask Question</button>
      <p>Answer: {answer}</p>
    </div>
  );
};

export default VoiceToTextQA;
