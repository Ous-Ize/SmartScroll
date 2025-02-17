import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormFieldCreate';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    // title: "",
    pdf: null,
  });

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (!result.canceled) {
        console.log('Picked PDF:', result);
        // Assuming result.assets is available as in the newer version of expo-document-picker
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
      ...form,
      pdf: null,
    });
  };

  const submit = async () => {
    // if (!form.pdf || form.title === "") {
    if (!form.pdf) {
    
      return Alert.alert('Error', 'Please select a PDF file before submitting.');
    }

    setUploading(true);
    try {
      // Create a FormData instance and append the title and pdf file
      const formData = new FormData();
      // formData.append('title', form.title);
      formData.append('file', {
        uri: form.pdf.uri,
        name: form.pdf.name,
        type: 'application/pdf',
      });

      console.log('Submitting PDF:', formData);

      // Post the form data to your backend endpoint
      const response = await fetch('http://192.168.178.33:8000/upload-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload PDF');
      }

      Alert.alert('Success', 'PDF uploaded successfully!');
      router.push('/home');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      Alert.alert('Error', 'Failed to upload the PDF.');
    } finally {
      // Reset the form and uploading state
      setForm({
        // title: "",
        pdf: null,
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="my-4 px-4 space-y-6 bg-background">
        <View className="justify-center items-center flex-row">
          <Text style={{ fontSize: 20, fontFamily: Platform.select({ ios: 'Inter-Bold' }),
        }}>Upload Learning Material</Text>
        </View>
      </View>
      <View className="justify-center items-center mt-[80px]">
        <Image
          source={images.upload}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
          style={{ tintColor: 'rgba(245, 130, 50, 0.5)' }}
        />
        <View>
          <Text
            style={{ fontSize: 20, fontFamily: Platform.select({ ios: 'Inter-Regular' }), color: 'rgb(90,90,90)' }}
            className="justify-center items-center mt-6 mx-20 text-center"
          >
            Let AI generate learning content for you!
          </Text>
        </View>
        {/* <FormField
          title="Title"
          value={form.title}
          placeholder="Give your material a title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        /> */}
      </View>
      <View className="justify-center items-center mt-[120px]">
        <View className="mb-20">
          {form.pdf ? (
            <View
              className="w-[280px] h-[70px] border border-solid flex flex-row justify-between items-center rounded-2xl border-[rgb(90,90,90)] p-4"
              style={{ overflow: 'hidden' }}
            >
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text className="text-[rgb(90,90,90)] text-base font-bold">
                  {form.pdf.name}
                </Text>
                <Text className="text-[rgb(90,90,90)] text-sm">
                  {(form.pdf.size / 1024).toFixed(2)} KB
                </Text>
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
                <Text className="text-[rgb(90,90,90)] text-2xl" style={{fontFamily: Platform.select({ ios: 'Inter-Medium' })}}>Add a PDF</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <CustomButton
            title="Send"
            handlePress={submit}
            containerStyles="w-[160px] h-[70px] rounded-3xl"
            textStyles="text-2xl"
            isLoading={uploading}
          />
        </View>
        <View
          style={{
            marginTop:50,
          }}
        >
          <Text className="text-[rgb(90,90,90)]" style={{fontFamily: Platform.select({ ios: 'Inter-Light' })}}>SmartScroll can make mistakes. Check important info.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Create;
