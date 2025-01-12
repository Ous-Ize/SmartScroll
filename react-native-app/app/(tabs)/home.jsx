import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { images } from '../../constants'
import EmptyState from '../../components/EmptyState'
import summaryData from '../../test-data/summary.json'
import SummaryCard from '../../components/SummaryCard'

const Home = () => {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    // check if there is any new content
    setRefreshing(false);

  }

  return (
    <SafeAreaView className="bg-background h-full">
      <FlatList
        // data={data}
        data={summaryData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/home/detail', // Navigate to the detail page
                params: {
                  title: item.title,
                  text: item.text,
                  image_source: item.image_source,
                },
              })
            }
          >
            <SummaryCard summary={item} />
          </TouchableOpacity>
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home