import React from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/info-bg.jpg")}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>
              Bonsai
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.text}>
            Das Wort "Bonsai" kommt aus dem Japanischen (盆栽) und bedeutet
            wörtlich "Baum in einer Schale" (盆 = „Schale“, 栽 = „pflanzen“). Es
            bezeichnet die Kunst, Bäume und Sträucher in kleinen Gefäßen zu
            kultivieren und durch gezielte Pflege, Schnitt- und Drahttechniken
            in eine ästhetische, oft naturnahe Form zu bringen.
          </ThemedText>

          <ThemedText style={styles.text}>
            Das Wort "Bonsai" kommt aus dem Japanischen (盆栽) und bedeutet
            wörtlich "Baum in einer Schale" (盆 = „Schale“, 栽 = „pflanzen“). Es
            bezeichnet die Kunst, Bäume und Sträucher in kleinen Gefäßen zu
            kultivieren und durch gezielte Pflege, Schnitt- und Drahttechniken
            in eine ästhetische, oft naturnahe Form zu bringen.
          </ThemedText>

          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>
              Bonsai Pflege
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.text}>
            Ein Bonsai benötigt eine ausgewogene Düngung während der
            Wachstumsphase im Frühjahr und Sommer. Im Winter sollte weniger oder
            gar nicht gedüngt werden. Der richtige Schnitt fördert eine schöne
            Form und verhindert unkontrolliertes Wachstum. Wurzelschnitte sind
            beim Umtopfen erforderlich, um das Wurzelsystem gesund zu halten.
            Ein Bonsai sollte alle zwei bis fünf Jahre umgetopft werden,
            abhängig von der Art.
          </ThemedText>

          <ThemedText style={styles.text}>
            Die Wahl der Erde spielt eine wichtige Rolle – sie sollte gut
            durchlässig sein. Schädlinge wie Blattläuse oder Spinnmilben müssen
            frühzeitig erkannt und bekämpft werden. Drahtungen helfen, Äste in
            die gewünschte Form zu bringen, sollten aber regelmässig
            kontrolliert werden, um Einschnürungen zu vermeiden. Im Winter
            benötigen einige Bonsai Schutz vor Frost. Tropische Arten sollten
            nicht unter 10 °C gehalten werden.
          </ThemedText>

          <ThemedText style={styles.text}>
            Regelmässige Beobachtung hilft, Krankheiten oder Mangelerscheinungen
            frühzeitig zu erkennen. Eine gleichmäßige Pflege führt zu einem
            gesunden und ästhetischen Baum. Der Bonsai ist nicht nur eine
            Pflanze, sondern ein Kunstwerk, das mit Geduld und Hingabe geformt
            wird.
          </ThemedText>

          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>
              Bonsai Bewässerung
            </ThemedText>
          </ThemedView>

          <ThemedText style={styles.text}>
            Die richtige Bewässerung eines Bonsai ist essenziell für sein
            Wachstum und seine Gesundheit. Die Erde sollte gleichmässig feucht,
            aber nicht dauerhaft nass sein, da Staunässe schnell zu Wurzelfäule
            führen kann. Beim Giessen sollte so viel Wasser verwendet werden,
            dass es aus den Drainagelöchern unten im Topf austritt. Regenwasser
            ist ideal, da es kalkarm ist, aber abgestandenes Leitungswasser kann
            ebenfalls verwendet werden. In den Sommermonaten muss ein Bonsai oft
            täglich gegossen werden, während im Winter weniger Wasser benötigt
            wird. Besonders tropische Bonsai profitieren von einer höheren
            Luftfeuchtigkeit, die durch regelmässiges Besprühen erhöht werden
            kann. Es ist wichtig, morgens oder abends zu giessen, um eine zu
            schnelle Verdunstung zu vermeiden. Stark ausgetrocknete Erde kann
            durch kurzes Eintauchen des Topfes in Wasser wieder gut
            durchfeuchtet werden. Durch aufmerksame Beobachtung kann man die
            individuellen Bedürfnisse des Bonsai erkennen und ihn optimal
            pflegen.
          </ThemedText>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  titleContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "none",
  },
  title: {
    fontSize: 28,
    fontFamily: "IndieFlower",
    color: "#73906e",
    lineHeight: 55,
  },
  text: {
    fontSize: 16,
    color: "#333",
    fontFamily: "IndieFlower",
    marginBottom: 15,
    textAlign: "justify",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageStyle: {
    width: "145%",
    height: undefined,
    left: "50%",
    top: "15%",
    transform: [{ translateX: -100 }],
    opacity: 0.6,
  },
});
