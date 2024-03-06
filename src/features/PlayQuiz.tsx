import { QuizItem } from '../types/quiz-types';

export const PlayQuiz = (props: { quiz: QuizItem[]}) => {
  console.log(props.quiz);
  return <>Play</>;
};
