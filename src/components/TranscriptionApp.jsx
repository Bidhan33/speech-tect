import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TranscriptionDisplay from './TranscriptionDisplay';
import QuestionsA from './questionsA';

const TranscriptionApp = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support speech recognition. Please try Chrome or a supported browser.");
      return;
    } 

    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + event.results[i][0].transcript + ' ');
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      console.log("Interim transcript:", interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert(`Error occurred: ${event.error}`);
    };

    recognition.onend = () => {
      console.log("Speech recognition service disconnected");
      setIsRecording(false);
    };
  }, []);

  const toggleRecording = () => {
    const recognition = recognitionRef.current;
    if (isRecording) {
      recognition.stop();
      console.log("Stopped recording");
    } else {
      setTranscript("");
      recognition.start();
      console.log("Started recording");
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="transcription-app">
      <h1>Transcription Application</h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="transcribe-button"
        onClick={toggleRecording}
      >
        {isRecording ? "Stop Transcribing" : "Start Transcribing"}
      </motion.button>
      <TranscriptionDisplay transcript={transcript} />
      <QuestionsA transcript={transcript} />
    </div>
  );
};

export default TranscriptionApp;