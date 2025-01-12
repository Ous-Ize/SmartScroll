import { Stack } from 'expo-router';
import CustomHeader from '../../components/CustomHeader';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="detail"
        options={{
          header: () => <CustomHeader />, // Use custom header for Detail screen
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
