import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native';
import { PaperProvider, Card } from 'react-native-paper';

const FlashcardCard = ({ flashcard: { front, back } }) => {
  const [flipped, setFlipped] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');

  const colors = ['#34A0A4', '#168AAD', '#52B69A', '#52B69A'];

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  }, []);

  const handlePress = () => {
    setFlipped(!flipped);
  };

  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Card
              style={{
                margin: 5,
                marginTop: 2,
                borderRadius: 20,
                overflow: 'hidden',
                backgroundColor: backgroundColor, 
              }}
            >
              <View
                style={{
                  padding: 5,
                  paddingLeft: 15,
                  paddingBottom: 5,
                  borderRadius: 20,
                  height: 220,
                  justifyContent: 'center',
                  alignItems: 'flex-start'
                }}
              >
                {/* Question/Answer Label */}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#FFFDF5',
                    marginBottom: 5,
                    marginHorizontal: 15
                  }}
                >
                  {flipped ? 'Answer' : 'Question'}
                </Text>

                {/* Question/Answer Content */}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    flexWrap: 'wrap',
                    textAlign: 'start',
                    color: '#FFFDF5',
                    marginHorizontal: 15
                  }}
                  numberOfLines={6}
                >
                  {flipped ? back : front}
                </Text>
              </View>
            </Card>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default FlashcardCard;
