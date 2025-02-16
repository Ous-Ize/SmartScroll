import { Stack } from 'expo-router';
import CustomHeader from '../../components/CustomHeader';

const ChatBotLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="chatbot"
        options={{
          header: () => <CustomHeader />, // Use custom header for Detail screen
        }}
      />
    </Stack>
  );
};

export default ChatBotLayout;
