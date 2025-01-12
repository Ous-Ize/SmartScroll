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
        <View className="items-start px-6 py-[300px]">
          <Image 
            source={images.logo} 
            resizeMode="contain" 
            className="px-4 w-[200px] h-[200px]"
          />
          <Text 
            className="px-4 text-4xl text-black font-bold text-left"
            numberOfLines={2}
            >
              Welcome {'\n'}to SmartScroll!
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
