import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [loaded] = useFonts({
        CangErTi: require("@/assets/fonts/cangErYuYangTi.ttf"),
        Conspired: require("@/assets/fonts/conspired-lovers.woff.ttf"),
        DongQing: require("@/assets/fonts/DongQingHeiTi.otf"),
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
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="(home)" />
        </Stack>
    );
}
