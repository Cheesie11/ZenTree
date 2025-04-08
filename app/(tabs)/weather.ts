import * as Location from "expo-location";

const API_KEY = "f256de69a88e1ffb369abd4687d0d85b";

type RainCheckResult = {
  isRaining: boolean;
  description?: string;
  temp?: number;
};

export async function checkIfRaining(): Promise<RainCheckResult> {
  try {

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Standortberechtigung abgelehnt");
      return { isRaining: false };
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    const weather = data.weather?.[0]?.main?.toLowerCase() || "";
    const description = data.weather?.[0]?.description || "";
    const temp = data.main?.temp;

    const isRaining = weather.includes("rain") || description.includes("rain");

    return {
      isRaining,
      description,
      temp,
    };
  } catch (error) {
    console.error("Wetter-Check fehlgeschlagen:", error);
    return { isRaining: false };
  }
}
