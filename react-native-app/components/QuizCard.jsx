import * as React from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { PaperProvider, Card } from 'react-native-paper';
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

  const handleChoicePress = (choice) => {
    if (hasAnswered) return; 

    setSelectedChoice(choice);
    setHasAnswered(true);

    if (choice === correct_answer) {
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
              backgroundColor: backgroundColor
            }}
          >
            <View style={styles.cardContainer}>
              <Text style={styles.questionText}>{question}</Text>

              {choices && choices.map((choice, index) => {
                let buttonStyle = [styles.choiceButton];

                if (hasAnswered) {
                  if (choice === correct_answer) {
                    buttonStyle.push(styles.correctChoiceButton);
                  } else if (choice === selectedChoice) {
                    buttonStyle.push(styles.incorrectChoiceButton);
                  } else {
                    buttonStyle.push(styles.disabledChoiceButton);
                  }
                }

                return (
                  <TouchableOpacity 
                    key={index}
                    style={buttonStyle}
                    onPress={() => handleChoicePress(choice)}
                  >
                    <Text style={styles.choiceText}>{choice}</Text>
                  </TouchableOpacity>
                );
              })}

              {hasAnswered && (
                <Text style={styles.feedbackText}>
                  {isCorrect 
                    ? "Correct! ✅" 
                    : `Incorrect ❌ The right answer is: ${correct_answer}`
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
    padding: 10
  },
  correctChoiceButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)' 
  },
  incorrectChoiceButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)' 
  },
  disabledChoiceButton: {
    opacity: 0.4
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
    fontSize: 16
  }
});

export default QuizCard;
