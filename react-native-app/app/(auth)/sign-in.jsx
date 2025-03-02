import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '../../constants';
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router';
import CustomButton from '../../components/CustomButton'
import { Platform } from 'react-native';

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async () => {
    setIsSubmitting(true);
  
    try {
      const requestBody = {
        username: form.username,
        password: form.password
      };
  
      console.log("📤 Daten, die gesendet werden:", JSON.stringify(requestBody));
  
      const response = await fetch('http://127.0.0.1:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('✅ Login erfolgreich!');
        router.push('/home');
      } else {
        if (Array.isArray(data.detail)) {
          alert(data.detail[0].msg);
        } else {
          alert(data.detail || '❌ Login fehlgeschlagen!');
        }
      }
    } catch (error) {
      console.error('Login-Fehler:', error);
      alert('❌ Es gab ein Problem mit der Anmeldung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View style={{ alignItems: 'center' }}>
          <View className="flex-row items-center mt-10">
            <Text
              className="text-2xl text-black font-semibold"
              style={{
                fontFamily: Platform.select({ ios: 'Inter-Black' }),
                color: '#414833',
              }}
            >
              Log In to
            </Text>

            <Image 
              source={icons.zoomed_icon} 
              resizeMode="contain" 
              className="w-[100px] h-[100px] ml-2" 
            />
          </View>
          </View>

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: u })}
            otherStyles={styles.formField}
            keyboardType="email-address"
          />
          
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formField}
          />
          <CustomButton 
            title="Sign In"
            handlePress={handleLogin} 
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2 mb-10">

            <Text className="text-lg font-pregular"
              style={{
                fontFamily: Platform.select({ ios: 'Inter-Medium' }),
                color: '#414833',
              }}
            >
              Don't have an account?
            </Text>
            <Link 
              style={{
                fontFamily: Platform.select({ ios: 'Inter-Black' }),
                color: '#414833',
              }}
              href="/sign-up" 
              className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
          <Image 
            source={images.safari} 
            resizeMode="contain" 
            className="w-full h-[160px]"
          />  
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  formField: {
    padding: 8,  
  },
});

export default SignIn