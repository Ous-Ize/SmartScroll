import * as React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Provider as PaperProvider, Card } from 'react-native-paper';
import { useState, useEffect } from 'react';

const QuizCard = ({ quiz: { question, choices, correct_answer } }) => {
  const [backgroundColor, setBackgroundColor] = useState('');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const colors = ['#34A0A4', '#168AAD', '#52B69A', '#52B69A'];

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  const handleChoicePress = (choiceKey) => {
    if (hasAnswered) return;

    setSelectedChoice(choiceKey);
    setHasAnswered(true);

    if (choiceKey === correct_answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <Card
            style={{
              margin: 5,
              marginTop: 2,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: backgroundColor,
            }}
          >
            <View style={styles.cardContainer}>
              <Text style={styles.questionText}>{question}</Text>

              {/* Iterate over the choices object */}
              {choices && Object.entries(choices).map(([choiceKey, choiceText]) => {
                let buttonStyle = [styles.choiceButton];

                if (hasAnswered) {
                  if (choiceKey === correct_answer) {
                    buttonStyle.push(styles.correctChoiceButton);
                  } else if (choiceKey === selectedChoice) {
                    buttonStyle.push(styles.incorrectChoiceButton);
                  } else {
                    buttonStyle.push(styles.disabledChoiceButton);
                  }
                }

                return (
                  <TouchableOpacity 
                    key={choiceKey}
                    style={buttonStyle}
                    onPress={() => handleChoicePress(choiceKey)}
                  >
                    <Text style={styles.choiceText}>
                      {choiceKey.toUpperCase()}. {choiceText}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {hasAnswered && (
                <Text style={styles.feedbackText}>
                  {isCorrect
                    ? "Correct! ✅"
                    : `Incorrect ❌ The right answer is: ${correct_answer.toUpperCase()}. ${choices[correct_answer]}`
                  }
                </Text>
              )}
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 25,
    borderRadius: 20,
    minHeight: 300,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    flexWrap: 'wrap',
    textAlign: 'left',
    color: '#FFFDF5',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  choiceButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  correctChoiceButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)', // green
  },
  incorrectChoiceButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)', // red
  },
  disabledChoiceButton: {
    opacity: 0.4,
  },
  choiceText: {
    color: '#FFFDF5',
    fontSize: 16,
  },
  feedbackText: {
    marginTop: 20,
    marginHorizontal: 15,
    color: '#FFFDF5',
    fontStyle: 'italic',
    fontSize: 16,
  },
});

export default QuizCard;
