import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        ZenTree
      </ThemedText>
      <ThemedText style={styles.text}>
        Track, nurture, and never forget to water your bonsai.
      </ThemedText>
      <Image
        source={require("@/assets/images/home-img.jpg")}
        style={styles.welcomeImage}
      />
      <View style={styles.libraryContainer}>
        <ThemedText style={styles.librarySubtitle}>Your Library:</ThemedText>
      </View>

      <Button title="Open Camera" onPress={openCamera} />

      <ScrollView>
        {images.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedImage(img)}>
            <Image
              source={{ uri: img }}
              style={{ width: 100, height: 100, borderRadius: 8, margin: 5 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selectedImage} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setSelectedImage(null)}
        >
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} />
          )}
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  title: {
    fontSize: 35,
    marginBottom: 5,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "IndieFlower",
    lineHeight: 55,
    color: "#73906e",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    fontFamily: "IndieFlower",
    paddingHorizontal: 25,
  },
  welcomeImage: {
    width: 400,
    height: 300,
    resizeMode: "contain",
  },
  libraryContainer: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 25,
    marginTop: 20,
  },
  librarySubtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    fontFamily: "IndieFlower",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "60%",
    borderRadius: 10,
  },
});
