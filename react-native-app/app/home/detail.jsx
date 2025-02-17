import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Platform } from 'react-native';

const DetailScreen = () => {
  const { title, summary, image_source } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: image_source }} style={styles.image} />
      <Text style={styles.text}>{summary}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 5,
    backgroundColor: '#FFFDF5',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    paddingStart: 5
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    paddingStart: 10,
    fontFamily: Platform.select({ ios: 'Inter-ExtraBold'}),
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    padding: 10, 
    paddingBottom: 10,
    marginBottom: 50,
    fontFamily: Platform.select({ ios: 'Inter-Light'}),
  },
});

export default DetailScreen;
