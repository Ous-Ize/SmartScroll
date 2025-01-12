import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="absolute top-[230px] left-[48px]">
          <Image 
            source={images.logo} 
            resizeMode="contain" 
            className="w-[200px] h-[200px]"
          />
        </View>
        <View className="absolute top-[450px] left-[48px]">
            <Text 
            className="text-5xl text-black font-bold text-left"
            numberOfLines={2}
            >
              Welcome {'\n'} to Smart scroll
            </Text>
            <CustomButton
              title="Home"
              handlePress={() => router.push('/home')}
              containerStyles="w-full mt-7"
             />

          </View>
      </ScrollView>
      {/* <StatusBar backgroundColor='' style='dark' /> */}
    </SafeAreaView>
  );
}
