import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { Link} from 'expo-router';


const Search = () => {
  return (
    <SafeAreaView className="bg-background h-full">
      <View style={styles.header}>
        {/* <Image source={images.chatbot} style={styles.icon} resizeMode="contain" />
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>+100</Text>
          <Image source={images.flame} style={styles.icon} resizeMode="contain" />
        </View> */}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center", 
          flex: 1, 
        }}
      >
        <Text>This page is currently under construction.</Text>
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default Search;