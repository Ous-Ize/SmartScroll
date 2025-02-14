import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center px-6 py-[280]">
          <Image 
            source={images.logo} 
            resizeMode="contain" 
            className="px-4 w-[200px] h-[200px]"
          />
          <Text 
            className="px-4 text-4xl text-black font-bold text-center mt-4 mb-20">
              Welcome to Smart Scroll
            </Text>
            <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full" 
          />
          {/* <Text className="text-center font-semibold py-[40]">
            Smart Scroll can make mistakes! check important information.
          </Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
