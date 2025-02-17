import React from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, Text, ImageBackground, View } from 'react-native';
import { Provider as PaperProvider, Card } from 'react-native-paper';
import { Platform } from 'react-native';

const SummaryCard = ({ summary: { title, summary, image_source }, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <PaperProvider>
        <SafeAreaView>
          <ScrollView>
            <Card
              style={{
                margin: 5,
                marginTop: 2,
                borderRadius: 12,
                overflow: 'hidden',
                height: 250
              }}
            >
              <ImageBackground
                source={{ uri: image_source }}
                resizeMode="cover"
                style={{
                  height: 260,
                  width: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#FFFDF5',
                    padding: 20,
                    paddingLeft: 25,
                    paddingBottom: 15,
                    borderRadius: 12,
                    height: 135,
                  }}
                >
                  {/* Subtitle */}
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'gray',
                      marginBottom: 4, 
                      fontFamily: Platform.select({ ios: 'Inter-Regular'}),
                    }}
                  >
                    Summary
                  </Text>

                  {/* Title */}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      fontFamily: 'Helvetica',
                      flexWrap: 'wrap',
                      fontFamily: Platform.select({ ios: 'Inter-SemiBold'}),
                    }}
                    numberOfLines={4}
                  >
                    {title}
                  </Text>
                </View>
              </ImageBackground>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
    </TouchableOpacity>
  );
};

export default SummaryCard;
