import React from 'react';

type QuestionAnswerProps = {
  answer: string;
};

export const QuestionAnswer: React.FC<QuestionAnswerProps> = ({ answer }) => {
  return <div>{answer}</div>;
};
