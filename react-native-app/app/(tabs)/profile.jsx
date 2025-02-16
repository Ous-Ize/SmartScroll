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


const Profile = () => {
  var full_name = "Max Mustermann"
  return (
    <SafeAreaView className="bg-background h-full">
      <View className="px-4 space-y-6 bg-background">
        <View className="justify-between items-start flex-row ">
          <View className="mt-1.5 ms-2">
            <Image
              source={images.chatbot}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
          <View className="me-2">
            <Image
              source={images.flame}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} className="mt-7"> 
        <View style={styles.profileContainer}>
          <Image source={images.profile} style={styles.profileImage} />
          <Text style={styles.profileName}>{full_name}</Text>
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
          <Link href="..//index.jsx" style={styles.sectionItem}>Help</Link>
          <Link href="..//index.jsx" style={styles.sectionItem}>Reset data</Link>
          <Link href="..//index.jsx" style={styles.sectionItem}>Sign out</Link>
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
    marginBottom: 25,
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
    marginBottom: 20,
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