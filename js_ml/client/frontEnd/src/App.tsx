import React, { useState } from 'react';
import axios from 'axios';

interface ResponseData {
  data: string;
}

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleAskButtonClick = async () => {
    try {
      const response: ResponseData = await axios.post('http://localhost:3001/ask', { questionVal: question });
      setAnswer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="question-input">Question:</label>
      <input type="text" id="question-input" value={question} onChange={handleQuestionChange} />
      <button onClick={handleAskButtonClick}>Ask</button>
      {answer && <div>{answer}</div>}
    </div>
  );
}

export default App;
