import * as React from 'react';
import { SafeAreaView, ScrollView, Text, ImageBackground, View } from 'react-native';
import { PaperProvider, Card } from 'react-native-paper';

const SummaryCard = ({ summary: { title, summary, image_source } }) => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <Card
            style={{
              margin: 10,
              marginTop: 2,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <ImageBackground
              source={{
                uri: image_source,
              }}
              resizeMode="cover"
              style={{
                height: 250,
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <View
                style={{
                  backgroundColor: '#FFFDF5',
                  padding: 20,
                  paddingLeft: 15,
                  paddingBottom: 15,
                  borderRadius: 12,
                  height: 120,
                }}
              >
                {/* Subtitle */}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '300',
                    color: 'gray',
                    marginBottom: 4, // Space between subtitle and title
                  }}
                >
                  Summary
                </Text>

                {/* Title */}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '400',
                    fontFamily: 'Helvetica',
                    flexWrap: 'wrap',
                  }}
                  numberOfLines={3}
                >
                  {title}
                </Text>
              </View>
            </ImageBackground>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default SummaryCard;
