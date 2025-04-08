import { useState, useEffect } from "react";
import { checkIfRaining } from "./weather";
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
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [images, setImages] = useState<
    {
      uri: string;
      name: string;
      notes?: string;
      watering?: string;
    }[]
  >([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editWatering, setEditWatering] = useState("");
  const [editImageUri, setEditImageUri] = useState<string | null>(null);
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const savedImages = await AsyncStorage.getItem("images");
        if (savedImages) {
          setImages(JSON.parse(savedImages));
        }
      } catch (error) {
        console.error("Failed to load images from AsyncStorage", error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    const checkWeather = async () => {
      const result = await checkIfRaining();
      setIsRaining(result.isRaining);
    };

    checkWeather();
    const interval = setInterval(checkWeather, 3600000);
    return () => clearInterval(interval);
  }, []);

  const isWateringDay = (schedule: string) => {
    if (!schedule) return false;

    const days = parseInt(schedule);
    if (isNaN(days)) return false;

    const today = new Date();
    const dayOfWeek = today.getDay();

    return dayOfWeek % days === 0;
  };

  const getWateringStatus = (schedule: string) => {
    if (!isWateringDay(schedule)) return null;
    return isRaining ? "rain" : "water";
  };

  const saveImagesToStorage = async (
    newImages: {
      uri: string;
      name: string;
      notes?: string;
      watering?: string;
    }[]
  ) => {
    try {
      await AsyncStorage.setItem("images", JSON.stringify(newImages));
    } catch (error) {
      console.error("Failed to save images to AsyncStorage", error);
    }
  };

  const openCamera = async (forEdit: boolean = false) => {
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
      if (forEdit) {
        setEditImageUri(imageUri);
      } else {
        setSelectedImage(imageUri);
      }
    }
  };

  const saveImage = () => {
    if (selectedImage && imageName.trim()) {
      const newImage = {
        uri: selectedImage,
        name: imageName.trim(),
        notes: "",
        watering: "",
      };
      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      saveImagesToStorage(updatedImages);
      setSelectedImage(null);
      setImageName("");
    }
  };

  const deleteBonsai = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    saveImagesToStorage(updatedImages);
  };

  const openViewModal = (index: number) => {
    const bonsai = images[index];
    setSelectedIndex(index);
    setEditName(bonsai.name);
    setEditNotes(bonsai.notes || "");
    setEditWatering(bonsai.watering || "");
    setEditImageUri(bonsai.uri);
    setViewModalVisible(true);
  };

  const submitChanges = () => {
    if (selectedIndex === null) return;
    const updated = [...images];
    updated[selectedIndex] = {
      ...updated[selectedIndex],
      name: editName.trim(),
      notes: editNotes,
      watering: editWatering,
      uri: editImageUri || updated[selectedIndex].uri,
    };
    setImages(updated);
    saveImagesToStorage(updated);
    setViewModalVisible(false);
    setSelectedIndex(null);
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
          onPress={() => openCamera()}
          style={styles.cameraButton}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </Button>
      </View>

      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {images.map((img, index) => {
          const wateringStatus = getWateringStatus(img.watering || "");

          return (
            <View key={index} style={styles.bonsaiCard}>
              <View style={styles.textContainer}>
                <View style={styles.nameContainer}>
                  <ThemedText style={styles.bonsaiName}>{img.name}</ThemedText>
                  {wateringStatus && (
                    <View
                      style={[
                        styles.wateringIndicator,
                        wateringStatus === "rain"
                          ? styles.rainIndicator
                          : styles.waterIndicator,
                      ]}
                    >
                      <MaterialIcons
                        name={
                          wateringStatus === "rain" ? "water-drop" : "opacity"
                        }
                        size={16}
                        color="white"
                      />
                    </View>
                  )}
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity onPress={() => deleteBonsai(index)}>
                    <MaterialIcons name="delete" size={32} color="#d74f5a" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openViewModal(index)}>
                    <MaterialIcons
                      name="visibility"
                      size={32}
                      color="#73906e"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Image source={{ uri: img.uri }} style={styles.bonsaiImage} />
            </View>
          );
        })}
      </ScrollView>

      <Modal visible={!!selectedImage} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.editModalContent}>
                <View style={styles.modalHeader}>
                  <ThemedText style={styles.modalTitle}>New Bonsai</ThemedText>
                  <TouchableOpacity
                    onPress={() => setSelectedImage(null)}
                    style={styles.closeButton}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  contentContainerStyle={styles.scrollModalInner}
                  showsVerticalScrollIndicator={false}
                >
                  {selectedImage && (
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.editImage}
                    />
                  )}

                  <View style={styles.inputContainer}>
                    <ThemedText style={styles.inputLabel}>Name</ThemedText>
                    <TextInput
                      style={[styles.editInput, styles.nameInput]}
                      placeholder="Enter bonsai name"
                      value={imageName}
                      onChangeText={setImageName}
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={styles.editButtonRow}>
                    <TouchableOpacity
                      onPress={() => openCamera()}
                      style={[styles.circleButton, styles.outlineButton]}
                    >
                      <MaterialIcons
                        name="photo-camera"
                        size={24}
                        color="#73906e"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={saveImage}
                      style={[styles.circleButton, styles.filledButton]}
                    >
                      <MaterialIcons name="check" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={viewModalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setViewModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.editModalContent}>
                <View style={styles.modalHeader}>
                  <ThemedText style={styles.modalTitle}>Edit Bonsai</ThemedText>
                  <TouchableOpacity
                    onPress={() => setViewModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  contentContainerStyle={styles.scrollModalInner}
                  showsVerticalScrollIndicator={false}
                >
                  {editImageUri && (
                    <Image
                      source={{ uri: editImageUri }}
                      style={styles.editImage}
                    />
                  )}

                  <View style={styles.inputContainer}>
                    <ThemedText style={styles.inputLabel}>Name</ThemedText>
                    <TextInput
                      style={[styles.editInput, styles.nameInput]}
                      placeholder="Enter bonsai name"
                      value={editName}
                      onChangeText={setEditName}
                      placeholderTextColor="#999"
                    />

                    <ThemedText style={styles.inputLabel}>
                      Watering Schedule
                    </ThemedText>
                    <TextInput
                      style={[styles.editInput, styles.wateringInput]}
                      placeholder="e.g., Every 3 days, or when soil is dry"
                      value={editWatering}
                      onChangeText={setEditWatering}
                      placeholderTextColor="#999"
                    />

                    <ThemedText style={styles.inputLabel}>Notes</ThemedText>
                    <TextInput
                      style={[styles.editInput, styles.notesInput]}
                      placeholder="Add your care notes, observations, and reminders"
                      value={editNotes}
                      onChangeText={setEditNotes}
                      multiline
                      textAlignVertical="top"
                      placeholderTextColor="#999"
                    />
                  </View>

                  <View style={styles.editButtonRow}>
                    <TouchableOpacity
                      onPress={() => openCamera(true)}
                      style={[styles.circleButton, styles.outlineButton]}
                    >
                      <MaterialIcons
                        name="photo-camera"
                        size={24}
                        color="#73906e"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={submitChanges}
                      style={[styles.circleButton, styles.filledButton]}
                    >
                      <MaterialIcons name="check" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
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
    paddingBottom: 20,
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
  editModalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    lineHeight: 30,
    fontSize: 24,
    fontWeight: "600",
    color: "#73906e",
    fontFamily: "IndieFlower",
  },
  closeButton: {
    padding: 5,
  },
  scrollModalInner: {
    paddingBottom: 20,
  },
  editImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  inputContainer: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
    marginTop: 16,
  },
  editInput: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  nameInput: {
    height: 50,
  },
  wateringInput: {
    height: 50,
  },
  notesInput: {
    height: 150,
    paddingTop: 12,
  },
  editButtonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  circleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  outlineButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#73906e",
  },
  filledButton: {
    backgroundColor: "#73906e",
  },
  bonsaiCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    height: 120,
    backgroundColor: "#f9f9f9",
  },
  textContainer: {
    width: "50%",
    alignItems: "flex-start",
    padding: 20,
  },
  bonsaiName: {
    fontSize: 20,
    fontFamily: "IndieFlower",
    lineHeight: 30,
    color: "#555",
    textAlign: "left",
  },
  bonsaiImage: {
    width: "50%",
    height: "100%",
    resizeMode: "cover",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  wateringIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  waterIndicator: {
    backgroundColor: "#4CAF50",
  },
  rainIndicator: {
    backgroundColor: "#FFC107",
  },
});
