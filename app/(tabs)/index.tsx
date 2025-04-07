import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");

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
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
    }
  };

  const saveImage = () => {
    if (selectedImage) {
      setImages((prevImages) => [...prevImages, selectedImage]);
      setSelectedImage(null);
      setImageName("");
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
        <Button
          mode="contained"
          onPress={openCamera}
          style={styles.cameraButton}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </Button>
      </View>

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
        <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={styles.modalContent}>
                {selectedImage && (
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.fullImage}
                  />
                )}
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter name"
                  value={imageName}
                  onChangeText={setImageName}
                />
                <View style={styles.buttonRow}>
                  <Button
                    mode="contained"
                    onPress={openCamera}
                    style={styles.cameraButton}
                  >
                    <MaterialIcons name="photo-camera" size={24} color="white" />
                  </Button>
                  <Button
                    mode="contained"
                    onPress={saveImage}
                    style={styles.saveButton}
                  >
                    <MaterialIcons name="check" size={24} color="white" />
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
    paddingHorizontal: 25,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  librarySubtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    fontFamily: "IndieFlower",
  },
  cameraButton: {
    backgroundColor: "#73906e",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  fullImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#73906e",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    gap: 10,
  },
});
