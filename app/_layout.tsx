import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Slot } from "expo-router";
import { StatusBar, SafeAreaView, StyleSheet, ImageBackground, useColorScheme } from "react-native";
import DeviceInfo from "@/src/utils/deviceInfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useColorSchemeStore from "@/src/stores/colorSchemeStore";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const setColorScheme = useColorSchemeStore((state) => state.setColorScheme);
    const systemColorScheme = useColorScheme();
    useEffect(() => {
        setColorScheme(systemColorScheme);

        if (DeviceInfo.osName === "android") {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor("transparent");
        }
        StatusBar.setBarStyle("dark-content");
    }, [systemColorScheme]);
    const insets = useSafeAreaInsets();
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
            <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
                <ImageBackground
                    source={require("@/src/assets/images/background.jpg")}
                    resizeMode="cover"
                    // 顶部header部分加上状态栏高度，需要隔开header，
                    style={[styles.background]}>
                    <Slot />
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#ffffff",
    },
    background: {
        flex: 1,

        // 这里是暂时的，为了让卡片居上一点
        paddingBottom: 0,
        justifyContent: "flex-start",
        // alignItems: "center",
    },
});
