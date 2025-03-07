import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import ChatbotCard from '../../components/ChatbotCard';
import { Platform } from 'react-native';

const ChatBotScreen = () => {
    const [messages, setMessages] = useState([
        { text: 'Hey! How can I help you? 🐯', sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const newUserMessage = { text: inputText, sender: 'user' };
        setMessages([...messages, newUserMessage]); 

        setInputText(''); 

        try {
            const response = await fetch('http://127.0.0.1:8000/summaries/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputText }),
            });

            const data = await response.json();
            if (response.ok) {
                const botMessage = { text: data.response, sender: 'bot' };
                setMessages([...messages, newUserMessage, botMessage]);
            } else {
                console.error('Error:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#FFFDF5'  }} behavior="padding">
            <ChatbotCard messages={messages} />
            <View
                style={{
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: 10,
                    marginBottom: 30,
                }}
            >
                <TextInput
                    style={{
                        flex: 1, 
                        backgroundColor: '#FFFDF5',
                        borderRadius: 20,
                        padding: 10,
                        fontSize: 16,
                        paddingLeft: 20,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        marginLeft: 5,
                        fontFamily: Platform.select({ ios: 'Inter-Regular' }),
                    }}
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={sendMessage}
                />

                <TouchableOpacity
                    onPress={sendMessage}
                    style={{
                        backgroundColor: '#F58232',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 20,
                        marginLeft: 10, 
                        marginRight: 5
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 600, 
                        fontFamily: Platform.select({ ios: 'Inter-Bold' })}}>Send</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
};

export default ChatBotScreen;
