import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import logoImg from '../src/assets/logo.png';
import bubbleImg from '../src/assets/bubble.png';
import '../global.css';
import { useEffect, useState } from 'react';
import { SetQuestionQty } from '../src/features/SetQuestionQty';
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizItem,
  QuizType,
} from './types/quiz-types';
import { SetQuestionCat } from './features/SetQuestionCat';
import { QuizAPI } from './api/quiz-api';
import { SetQuestionDif } from './features/SetQuestionDif';
import { PlayQuiz } from './features/PlayQuiz/PlayQuiz';
import { Score } from './features/Score';

enum Step {
  Loading,
  SetQuestionQty,
  SetQuestionCat,
  SetQuestionDif,
  Play,
  Score,
}

export function App() {
  const [step, setStep] = useState<Step>(Step.Loading);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: '',
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });
  // console.log(quizParams);
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [history, setHistory] = useState<boolean[]>([]);

  useEffect(() => {
    (async () => {
      setCategories([
        { id: -1, name: 'Mixed' },
        ...(await QuizAPI.fetchCategories()),
      ]);
      setStep(Step.SetQuestionQty);
    })();
  }, []);
  const header = (
    <Flex justify={'center'}>
      <Image h='24' src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.Loading:
        return (
          <Flex
            top={0}
            justify={'center'}
            alignItems={'center'}
            position={'absolute'}
            minHeight={'100vh'}
            w={'100%'}
          >
            <Spinner />
          </Flex>
        );
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
            onClickNext={async (difficulty: QuizDifficulty) => {
              const params = {
                ...quizParams,
                difficulty,
              };
              setQuizParams(params);
              const quizResp = await QuizAPI.fetchQuiz(params);
              if (quizResp.length > 0) {
                setQuiz(quizResp);
                setStep(Step.Play);
              } else {
                alert(
                  `Couldn't find ${params.amount} questions for this category, restaring game`
                );
                setStep(Step.SetQuestionQty);
              }
            }}
          />
        );
      case Step.Play:
        return (
          <PlayQuiz
            onFinished={(history_: boolean[]) => {
              setHistory(history_);
              setStep(Step.Score);
            }}
            quiz={quiz}
          />
        );
      case Step.Score:
        return (
          <Score
            history={history}
            onNext={() => {
              setStep(Step.SetQuestionQty);
            }}
            onTryAgain={() => {
              setStep(Step.Play);
            }}
          />
        );
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
