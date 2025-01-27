import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import icons from "../constants/icons"
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
            source={icons.back}
            className="w-6 h-6"
            resizeMode='contain'
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
    padding: 16,
    paddingBottom: 0,
    marginBottom:0,
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  backButton: {
    marginRight: 16,
  },
});

export default CustomHeader;
