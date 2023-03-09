import React, { useState } from 'react';

type QuestionFormProps = {
  onSubmit: (question: string) => Promise<string>;
};

export const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const answer = await onSubmit(question);
    // Do something with the answer, e.g. display it in a separate component
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
