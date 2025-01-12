import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const DetailScreen = () => {
  const { title, text, image_source } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: image_source }} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
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
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 10,
    paddingStart: 10
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
    padding: 10, 
    paddingBottom: 10,
    marginBottom: 50
  },
});

export default DetailScreen;
