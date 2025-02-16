import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { PaperProvider, Card } from 'react-native-paper';

const ChatbotCard = ({ messages }) => {
  const scrollViewRef = useRef();

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFDF5' }}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                marginVertical: 5,
                marginHorizontal: 10,
              }}
            >
              <Card
                style={{
                  backgroundColor: msg.sender === 'user' ? '#F58232' : '#778da9',
                  padding: 10,
                  borderRadius: 15,
                  overflow: 'hidden',
                }}
              >
                <Text
                  style={{
                    color: msg.sender === 'user' ? '#FFFDF5' : '#FFFDF5',
                    fontSize: 18,
                    fontWeight: 500
                  }}
                >
                  {msg.text}
                </Text>
              </Card>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default ChatbotCard;
