import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/info-bg.jpg')} 
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>
              Information
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate quam quis urna vehicula, vel egestas tortor consequat. Integer scelerisque nisi sit amet odio gravida, ac placerat nunc fringilla.
          </ThemedText>

          <ThemedText style={styles.text}>
            Morbi at ligula nec ipsum tempor vulputate. Sed sit amet auctor sapien. Sed at nisl ac nunc malesuada viverra.
          </ThemedText>

          <ThemedText style={styles.text}>
            Aliquam suscipit nisi id mi egestas, non tristique nisi fermentum. Mauris lacinia dui id risus efficitur auctor.
          </ThemedText>

          <ThemedText style={styles.text}>
            Ut convallis dui non augue auctor, non faucibus elit gravida. Donec sed ex tortor. Proin consequat auctor metus, sed gravida libero cursus ac.
          </ThemedText>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'none',
  },
  title: {
    fontSize: 28,
    fontFamily: 'IndieFlower',
    color: '#73906e',
    lineHeight: 55,
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'IndieFlower',
    marginBottom: 15,
    textAlign: 'justify',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageStyle: {
    width: '145%',
    height: undefined,
    left: '50%',
    top: '15%',
    transform: [{ translateX: -100 }],
  },
});
