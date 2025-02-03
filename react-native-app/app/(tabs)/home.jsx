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
// import flashcardData from '../../test-data/flashcards.json';
import quizData from '../../test-data/quizzes.json';
import SummaryCard from '../../components/SummaryCard';
import FlashcardCard from '../../components/FlashcardCard';
import { fetchUnsplashPhotos } from '../../services/unsplash';
import QuizCard from '../../components/QuizCard';

// import quizData from '../../test-data/quizzes.json'; // Mock data for quizzes


const Home = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedButton, setSelectedButton] = useState('summaries'); 
  const [summaryData, setSummaryData] = useState([]);
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [quizzesData, setQuizzesData] = useState([]);
  const [error, setError] = useState(null);

  const fetchSummaries = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/summaries');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const updatedData = await Promise.all(
        data.map(async (summaryItem) => {
          // if (!summaryItem.title) {
          //   return summaryItem;
          // }
          var photos = "";
          if(summaryItem.title === null){
            photos = await fetchUnsplashPhotos("Nice Picture", 1);
          } else{
            photos = await fetchUnsplashPhotos(summaryItem.title, 1);
          }

          if (photos.length > 0) {
            summaryItem.image_source = photos[0].image_source;
          }
  
          return summaryItem;
        })
      )
      console.log(updatedData);
      setSummaryData(updatedData);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchFlashcards = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/flashcards');
      if (!response.ok) {
        throw new Error(`Flashcards fetch error: ${response.status}`);
      }
      const data = await response.json();
      setFlashcardsData(data);
      console.log(data)
    } catch (err) {
      console.error('Fetch Flashcards Error:', err);
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchQuizzes = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/quizzes');
      if (!response.ok) {
        throw new Error(`Quizzes fetch error: ${response.status}`);
      }
      const data = await response.json();
      setQuizzesData(data);
      console.log(data)
    } catch (err) {
      console.error('Fetch Quizzes Error:', err);
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const onRefresh = () => {
    if (selectedButton === 'summaries') {
      fetchSummaries();
    } else if (selectedButton === 'flashcards') {
      fetchFlashcards();
    } else if (selectedButton === 'quizzes') {
      fetchQuizzes();
    } else {
      setRefreshing(false);
    }
  };

  const handleButtonPress = async (buttonName) => {
    setSelectedButton(buttonName);
    if (buttonName === 'summaries') {
      fetchSummaries();
    } else if (buttonName === 'flashcards') {
      fetchFlashcards();
    } else if (buttonName === 'quizzes') {
      fetchQuizzes();
    }
  };

  const renderContent = () => {
    if (selectedButton === 'summaries') {
      return (
        <FlatList
          className="h-[620px]"
          data={summaryData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/home/detail',
                  params: {
                    title: item.title,
                    summary: item.summary,
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
          data={flashcardsData} 
          keyExtractor={(item) => item._id}
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
          data={quizzesData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <QuizCard quiz={item}/>
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
    marginBottom: 10, 
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
    borderBottomWidth: 2, 
    borderBottomColor: '#F58232', 
  },
  selectedButtonText: {
    color: '#F58232',
  },
});


export default Home;
