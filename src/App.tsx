import { Box, Flex, Image } from '@chakra-ui/react';
import logoImg from '../src/assets/logo.png';
import bubbleImg from '../src/assets/bubble.png';
import '../global.css';
import { useEffect, useState } from 'react';
import { SetQuestionQty } from '../src/features/SetQuestionQty';
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizType,
} from './types/quiz-types';
import { SetQuestionCat } from './features/SetQuestionCat';
import { QuizAPI } from './api/quiz-api';
import { SetQuestionDif } from './features/SetQuestionDif';

enum Step {
  SetQuestionQty,
  SetQuestionCat,
  SetQuestionDif,
  Play,
  Score,
}

export function App() {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: '',
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });
  console.log(quizParams);
  const [categories, setCategories] = useState<QuizCategory[]>([]);

  useEffect(() => {
    (async () => {
      setCategories([
        { id: -1, name: 'Mixed' },
        ...(await QuizAPI.fetchCategories()),
      ]);
    })();
  }, []);
  const header = (
    <Flex justify='center'>
      <Image h='24' src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount });
              setStep(Step.SetQuestionCat);
            }}
            defaultValue={10}
            max={30}
            min={5}
            step={5}
          />
        );
      case Step.SetQuestionCat:
        return (
          <SetQuestionCat
            onClickNext={(category: string) => {
              setQuizParams({
                ...quizParams,
                category: category === '-1' ? '' : category,
              });
              setStep(Step.SetQuestionDif);
            }}
            categories={categories}
          />
        );
      case Step.SetQuestionDif:
        return (
          <SetQuestionDif
            onClickNext={(difficulty: QuizDifficulty) => {
              setQuizParams({
                ...quizParams,
                difficulty,
              });
              setStep(Step.Play);
            }}
          />
        );
      case Step.Play:
        return <></>;
      case Step.Score:
        return <></>;
      default:
        return null;
    }
  };
  return (
    <Box py={'10'} h='100%'>
      {header}
      <Image
        src={bubbleImg}
        position={'absolute'}
        zIndex={-1}
        right={-120}
        top={100}
      />
      <Box mt={100}>{renderScreenByStep()}</Box>
    </Box>
  );
}
