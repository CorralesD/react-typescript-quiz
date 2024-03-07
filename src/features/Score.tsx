import { Button, Flex, Heading, Text } from '@chakra-ui/react';

export const Score = (props: {
  history: boolean[];
  onNext: () => void;
  onTryAgain: () => void;
}) => {
  const rightAnswersCount = props.history.filter(
    (isValidAnswer: boolean) => isValidAnswer === true
  ).length;

  const rightAnswerPercentage =
    (rightAnswersCount * 100) / props.history.length;
  console.log('percentage ', rightAnswerPercentage);
  const renderMessage = () => {
    if (rightAnswerPercentage < 30) {
      return 'You need more practice !';
    } else if (rightAnswerPercentage < 50) {
      return 'Not bad !';
    } else if (rightAnswerPercentage < 75) {
      return 'Good job !';
    } else {
      return 'Amazing !!!';
    }
  };
  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading fontSize={'3xl'}>Score</Heading>
        <Heading fontSize={'xl'} mt={5}>
          {rightAnswersCount}/{props.history.length}
        </Heading>
        <Text fontWeight={'bold'} mt={20}>
          {renderMessage()}
        </Text>
      </Flex>
      {rightAnswerPercentage < 100 ? (
        <Button position={'absolute'} top={'80%'} onClick={props.onTryAgain}>
          Try Again ?
        </Button>
      ) : (
        ''
      )}
      <Button
        position={'absolute'}
        right={150}
        top={'80%'}
        onClick={props.onNext}
      >
        New game
      </Button>
    </>
  );
};
