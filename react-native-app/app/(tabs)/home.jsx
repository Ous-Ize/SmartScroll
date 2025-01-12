import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import EmptyState from '../../components/EmptyState'

const data = [{ id: 1 }, { id: 2 }, { id: 3 }]

const Home = () => {
  return (
    <SafeAreaView className="bg-background h-full">
      <FlatList
        // data={data}
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="mb-6 px-4 space-y-6 bg-background">
            <View className="justify-between items-start flex-row mb-6">
              <View className="mt-1.5 ms-2">
              <Image
                  source={images.chatbot}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
              <View className="me-2">
                <Image
                  source={images.flame}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Content Found"
            subtitle="Upload your first learning content!"
          />
        )}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  )
}

export default Home