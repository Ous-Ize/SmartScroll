import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from '../../constants'
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormFieldCreate';
import { Redirect, router } from 'expo-router';
import { useState } from "react";
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    pdf: null,
  });
  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf'
      });
  
      if (!result.canceled) {
        console.log('Picked PDF:', result);
        setForm({
          ...form,
          pdf: result.assets[0],
        });
      } else {
        console.log('Picker was canceled');
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick a document.');
    }
  };

  const removeFile = () => {
    setForm({
      pdf: null,
    });
  };

  const submit = async () => {
    if (!form.pdf |
      (form.title === "")) {
      return Alert.alert('Error', 'Please select a PDF file before submitting.');
    }

    setUploading(true);
    try {
      console.log('Submitting PDF:', form);
      Alert.alert('Success', 'PDF uploaded successfully!');
      router.push('/home'); 
    } catch (error) {
      console.error('Error uploading PDF:', error);
      Alert.alert('Error', 'Failed to upload the PDF.');
    } finally {
      setForm({
        title: "",
        pdf: null,
      });

      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-background h-full">
      <View className="my-4 px-4 space-y-6 bg-background">
        <View className="justify-center items-center flex-row">
          <Text style={{fontSize: '20', fontWeight: '700'}}>Upload Learning Material</Text>
        </View>
      </View>
      <View className="justify-center items-center mt-[80px]">
        <Image
          source={images.upload}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
          style={{tintColor:'rgba(245, 130, 50, 0.5)'}}
        />
        <View >
          <Text style={{fontSize: '20', fontWeight: '400', color: 'rgb(90,90,90)'}} className="justify-center items-center mt-6 mx-20 text-center">Let AI generate learning content for you!</Text>
        </View>
        <FormField
          title="Title"
          value={form.title}
          placeholder="Give your material a title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
      </View>
      <View className="justify-center items-center mt-[20px]">
        <View className="mb-20">
        {form.pdf ? (
            <View
              className="w-[280px] h-[70px] border border-solid flex flex-row justify-between items-center rounded-2xl border-[rgb(90,90,90)] p-4"
              style={{ overflow: 'hidden' }}
            >
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text className="text-[rgb(90,90,90)] text-base font-bold">{form.pdf.name}</Text>
                <Text className="text-[rgb(90,90,90)] text-sm">{(form.pdf.size / 1024).toFixed(2)} KB</Text>
              </View>
              <TouchableOpacity onPress={removeFile}>
                <Image
                  source={icons.trash}
                  resizeMode="contain"
                  className="w-6 h-6"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={openPicker}>
              <View
                className="w-[280px] h-[70px] border border-dashed flex flex-row justify-center items-center rounded-2xl border-[rgb(90,90,90)]"
              >
                <Image
                  source={icons.clip}
                  resizeMode="contain"
                  alt="upload"
                  className="w-8 h-8 mr-3"
                />
                <Text className="text-[rgb(90,90,90)] text-2xl">Add a PDF</Text>
              </View>
            </TouchableOpacity>
          )}

        </View>
        <View>
          <CustomButton
            title="Send"
            handlePress={submit}
            containerStyles="w-[160px] h-[70px] rounded-3xl"
            textStyles="text-xl"
            isLoading={uploading}
          />
        </View>  
      </View>
    </SafeAreaView>
  )
}

export default Create