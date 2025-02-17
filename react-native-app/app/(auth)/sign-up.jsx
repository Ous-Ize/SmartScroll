import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '../../constants';
import FormField from '../../components/FormField';
import { Link } from 'expo-router';
import CustomButton from '../../components/CustomButton'
import { Platform } from 'react-native';

const SignUp= () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    console.log('Form Submitted')
  }
  
  return (
    <SafeAreaView className="bg-background h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-0">
          <View style={{ alignItems: 'center' }}>
          <View className="flex-row items-center mt-10">
            <Text
              className="text-2xl text-black font-semibold"
              style={{
                fontFamily: Platform.select({ ios: 'Inter-Black' }),
                color: '#414833',
              }}
            >
              Sign Up to
            </Text>

            <Image 
              source={icons.zoomed_icon} 
              resizeMode="contain" 
              className="w-[100px] h-[100px] ml-2" 
            />
          </View>
          </View>

          <FormField 
            title="First Name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles={styles.formField}
          />
          
          <FormField 
            title="Last Name"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles={styles.formField}
          />

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">

            <Text className="text-lg font-pregular"
              style={{
                fontFamily: Platform.select({ ios: 'Inter-Medium' }),
                color: '#414833',
              }}
            >
              Have an account already?
            </Text>
            <Link 
              style={{
                fontFamily: Platform.select({ ios: 'Inter-Black' }),
                color: '#414833',
              }}
              href="/sign-in" className="text-lg font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
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


export default SignUp