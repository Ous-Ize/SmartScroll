import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { Platform } from 'react-native';

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-orangebutton rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      style={{borderRadius: 30}}
    >
      <Text className={`text-background font-psemibold text-2xl ${textStyles}`}
        style={{
          fontFamily: Platform.select({
            android: 'Inter_900Black',
            ios: 'Inter-Black',
          }),
        }}
      >
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;