import { useEffect, useState } from 'react';
import { QuizCategory } from '../types/quiz-types';
import { QuizAPI } from '../api/quiz-api';

export const SetQuestionCat = () => {
  const [categories, setCategories] = useState<QuizCategory[]>([]);

  useEffect(() => {
    (async () => {
      setCategories(await QuizAPI.fetchCategories());
    })();
  }, []);
  return <>Set Question Cat</>;
};
