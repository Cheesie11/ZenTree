import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
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
        <ThemedText style={styles.librarySubtitle}>
          Your Library:
        </ThemedText>
      </View>
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
    color: '#73906e',
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
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 25,
    marginTop: 20,
  },
  librarySubtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    fontFamily: "IndieFlower",
  },
});
