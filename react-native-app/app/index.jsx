import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton'; // Adjust path based on your structure
import { images, icons } from '../constants'; // Ensure correct import of images
import { Platform } from 'react-native';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="flex-1 justify-end items-center px-0 mt-10">
      <Image 
          source={icons.smartscroll} 
          resizeMode="contain" 
          className="w-full h-auto max-h-[250px] px-0 mt-20"
      />
      </View>
      <View className="flex-1 justify-center items-start px-6">
        <Text 
        style={{
          fontFamily: Platform.select({
            android: 'Inter_200ExtraLight',
            ios: 'Inter-ExtraLight',
          }),
          color: '#414833'
        }}
        className="text-4xl font-light text-black text-center mt-6 mb-6 ms-5">
          Welcome!
        </Text>
        <CustomButton
          title="Get Started"
          handlePress={() => router.push('/sign-in')}
          containerStyles="w-full"
        />
        {/* Info Text (Uncomment if needed) */}
        {/* <Text className="text-center font-semibold text-gray-500 mt-6">
          Smart Scroll can make mistakes! Check important information.
        </Text> */}

      </View>
      {/* <Image 
          source={images.safari} 
          resizeMode="contain" 
          className="w-full h-auto max-h-[250px] px-0"
        /> */}
    </SafeAreaView>
  );
};

export default WelcomeScreen;
