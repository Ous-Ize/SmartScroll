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

const Profile = () => {
  return (
    <SafeAreaView className="bg-background h-full">
      <View style={styles.header}>
        <Image source={images.chatbot} style={styles.icon} resizeMode="contain" />
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>+100</Text>
          <Image source={images.flame} style={styles.icon} resizeMode="contain" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileContainer}>
          <Image source={images.profile} style={styles.profileImage} />
          <Text style={styles.profileName}>Max Mustermann</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity><Text style={styles.sectionItem}>Edit</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.sectionItem}>Membership and payment</Text></TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <TouchableOpacity><Text style={styles.sectionItem}>Push notifications</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.sectionItem}>Email notifications</Text></TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Controls</Text>
          <TouchableOpacity><Text style={styles.sectionItem}>Help</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.sectionItem}>Reset data</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.sectionItem}>Sign Out</Text></TouchableOpacity>
        </View>
      </ScrollView>

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
  content: {
    paddingHorizontal: 16,
    paddingBottom: 80, 
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionItem: {
    fontSize: 16,
    color: '#555',
    paddingVertical: 7,
  },
});

export default Profile;