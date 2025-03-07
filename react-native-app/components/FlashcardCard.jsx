import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native';
import { PaperProvider, Card } from 'react-native-paper';
import { Platform } from 'react-native';

const FlashcardCard = ({ flashcard: { front, back } }) => {
  const [flipped, setFlipped] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');

  const colors = ['#0582ca', '#8e9aaf', '#5e60ce', '#02c39a'];

  useEffect(() => {
    setBackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
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
                  padding: 20,
                  paddingHorizontal: 30,
                  borderRadius: 20,
                  minHeight: 220,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#FFFDF5',
                    marginBottom: 5,
                    fontFamily: Platform.select({ ios: 'Inter-Light' }),
                  }}
                >
                  {flipped ? 'Answer' : 'Question'}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    flexShrink: 1, 
                    flexWrap: 'wrap', 
                    textAlign: 'start',
                    color: '#FFFDF5',
                    fontFamily: Platform.select({ ios: 'Inter-Bold' }),
                  }}
                  numberOfLines={10}
                  adjustsFontSizeToFit={true} 
                  minimumFontScale={0.8} 
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
