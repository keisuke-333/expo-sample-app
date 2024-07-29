import { useEffect } from "react"
import { SplashScreen, Stack } from "expo-router"
import {
  useFonts,
  NotoSansJP_400Regular,
  NotoSansJP_700Bold,
} from "@expo-google-fonts/noto-sans-jp"
import { RootSiblingParent } from "react-native-root-siblings"

SplashScreen.preventAutoHideAsync()

export const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    NotoSansJP_400Regular,
    NotoSansJP_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <RootSiblingParent>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </RootSiblingParent>
  )
}

export default RootLayout
