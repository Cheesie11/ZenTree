import AsyncStorage from "@react-native-async-storage/async-storage";
import { Bonsai } from "./Bonsai";

export const loadBonsais = async (): Promise<Bonsai[]> => {
  try {
    const savedBonsais = await AsyncStorage.getItem("images");
    return savedBonsais ? JSON.parse(savedBonsais) : [];
  } catch (error) {
    console.error("Failed to load bonsais from AsyncStorage", error);
    return [];
  }
};

export const saveBonsais = async (bonsais: Bonsai[]): Promise<void> => {
  try {
    await AsyncStorage.setItem("images", JSON.stringify(bonsais));
  } catch (error) {
    console.error("Failed to save bonsais to AsyncStorage", error);
  }
};
