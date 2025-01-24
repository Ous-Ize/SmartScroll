import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useRouter } from 'expo-router';

import { images } from '../../constants';
import EmptyState from '../../components/EmptyState';
// import summaryData from '../../test-data/summary.json';
import flashcardData from '../../test-data/flashcards.json';
import SummaryCard from '../../components/SummaryCard';
import FlashcardCard from '../../components/FlashcardCard';

// import quizData from '../../test-data/quizzes.json'; // Mock data for quizzes!


const Home = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedButton, setSelectedButton] = useState('summaries'); 
  const [summaryData, setSummaryData] = useState([]);
  const [error, setError] = useState(null);

  const fetchSummaries = async () => {
    setRefreshing(true);
    try {
      // Make sure the URL points to your running FastAPI backend
      const response = await fetch('http://127.0.0.1:8000/summaries');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setSummaryData(data);
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const onRefresh = async () => {
    fetchSummaries();
  };

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
    console.log(`Navigating to ${buttonName}`);
  };

  const renderContent = () => {
    if (selectedButton === 'summaries') {
      return (
        <FlatList
          className="h-[620px]"
          data={summaryData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/home/detail',
                  params: {
                    title: item.title,
                    text: item.text,
                    image_source: item.image_source,
                  },
                })
              }
            >
              <SummaryCard summary={item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Summaries Found"
              subtitle="Upload your first summary!"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      );
    } else if (selectedButton === 'flashcards') {
      return (
        <FlatList
          className="h-[620px]"
          data={flashcardData} 
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FlashcardCard flashcard={item} />}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Flashcards Found"
              subtitle="Create your first flashcard!"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      );
    } else if (selectedButton === 'quizzes') {
      return (
        <FlatList
          className="h-[620px]"
          data={[]} // Replace with actual quiz data
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text>Quizzes are comming soon!</Text>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Quizzes Found"
              subtitle="Add your first quiz!"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      );
    }
  };
  

  return (
    <SafeAreaView className="bg-background h-full">
      <View>
      <View className="px-4 space-y-6 bg-background">
        <View className="justify-between items-start flex-row ">
          <View className="mt-1.5 ms-2">
            <Image
              source={images.chatbot}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
          <View className="me-2">
            <Image
              source={images.flame}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Transparent Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'summaries' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('summaries')}
          activeOpacity={1}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'summaries' && styles.selectedButtonText,
            ]}
          >
            Summaries
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'flashcards' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('flashcards')}
          activeOpacity={1}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'flashcards' && styles.selectedButtonText,
            ]}
          >
            Flashcards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'quizzes' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('quizzes')}
          activeOpacity={1}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'quizzes' && styles.selectedButtonText,
            ]}
          >
            Quizzes
          </Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
      </View>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10, // Reduced margin to avoid excessive space
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    color: '#888',
  },
  selectedButton: {
    borderBottomWidth: 2, // Keep the line subtle
    borderBottomColor: '#F58232', // Use a clear color for visibility
  },
  selectedButtonText: {
    color: '#F58232',
  },
});


export default Home;
