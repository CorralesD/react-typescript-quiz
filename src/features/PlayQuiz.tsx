import { useState } from 'react';
import { QuizItem } from '../types/quiz-types';
import {
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

export const PlayQuiz = (props: { quiz: QuizItem[] }) => {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentQuizItem: QuizItem = props.quiz[currentQuizItemIndex];
  const availableAnswers: string[] = [
    currentQuizItem.correct_answer,
    ...currentQuizItem.incorrect_answers,
  ];

  const radioList = availableAnswers.map((availableAnswer: string) => {
    return (
      <Radio key={availableAnswer} value={availableAnswer}>
        <Text dangerouslySetInnerHTML={{ __html: availableAnswer }} />
      </Radio>
    );
  });
  return (
    <Flex direction={'column'} alignItems={'center'} justify={'center'}>
      <Heading
        fontSize={'3xl'}
        mt={100}
        mb={20}
        dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
      />
      <RadioGroup
        value=''
        onChange={() => setCurrentQuizItemIndex(currentQuizItemIndex + 1)}
      >
        <SimpleGrid columns={2} spacing={4}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
    </Flex>
  );
};
