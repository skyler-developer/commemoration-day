import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [loaded] = useFonts({
        CangErTi: require("@/src/assets/fonts/cangErYuYangTi.ttf"),
        Conspired: require("@/src/assets/fonts/conspired-lovers.woff.ttf"),
        DongQing: require("@/src/assets/fonts/DongQingHeiTi.otf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="(home)" />
            </Stack>
        </SafeAreaProvider>
    );
}
