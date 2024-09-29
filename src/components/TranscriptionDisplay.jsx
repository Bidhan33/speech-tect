import React from 'react';
import { motion } from 'framer-motion';
import "../styles/TranscriptionDisplay.css"; // Adjust the path to point to the styles folder
// Make sure to create this CSS file or add these styles to your main CSS

const TranscriptionDisplay = ({ transcript }) => {
  return (
    <motion.div
      className="transcription-display"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Transcription:</h2>
      <div className="transcription-box">
        <p>{transcript || 'Start speaking to see the transcription...'}</p>
      </div>
    </motion.div>
  );
};

export default TranscriptionDisplay;
