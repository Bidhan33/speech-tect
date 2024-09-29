import React, { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for development/demo
});

const QuestionsA = ({ transcript }) => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async () => {
    if (!transcript.trim()) {
      alert("Please speak something before asking a question.");
      return;
    }
    
    setIsLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": transcript}]
      });

      setAnswer(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error asking question:', error);
      setAnswer('Sorry, there was an error processing your question.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={askQuestion} disabled={isLoading || !transcript}>
        {isLoading ? 'Processing...' : 'Ask ChatGPT'}
      </button>
      {answer && <p>Answer: {answer}</p>}
    </div>
  );
};

export default QuestionsA;