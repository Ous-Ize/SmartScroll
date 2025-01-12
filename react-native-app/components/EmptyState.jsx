import { View, Text, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { images } from '../constants'
import CustomButton from '../components/CustomButton'

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4 py-[110px]">
      <Image
        source={images.empty} className="w-[150px] h-[150px]" resizeMethod='contain'
      />
      <Text className="text-xl text-center font-psemibold text-black-100 mt-2">{title}</Text>
      <Text className="text-sm font-pmedium text-black-100">
        {subtitle}
      </Text>
      <CustomButton 
        title="Create Content"
        handlePress={() => router.push('/create')}
        containerStyles="w-full my-5"
      />
    </View>
  )
}

export default EmptyState