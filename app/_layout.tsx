import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot, useSegments, useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { StatusBar, SafeAreaView, StyleSheet, ImageBackground, useColorScheme } from "react-native";
import DeviceInfo from "@/src/utils/deviceInfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useColorSchemeStore from "@/src/stores/colorSchemeStore";
import { Provider } from "@ant-design/react-native";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments(); // 获取当前路由的路径片段
    const opacity = useSharedValue(0); // 用于控制透明度的动画值
    const translateX = useSharedValue(50); // 用于控制水平移动的动画值
    console.log(segments);
    // 动态样式
    const animatedStyle = useAnimatedStyle(() => ({
        flex: 1,
        opacity: opacity.value,
        transform: [{ translateX: translateX.value }],
    }));

    useEffect(() => {
        console.log("路由变化");
        // 当路由变化时，触发动画
        opacity.value = 0; // 初始透明度为 0
        translateX.value = 50; // 初始位置向右偏移

        // 使用 withTiming 设置动画过渡效果
        opacity.value = withTiming(1, { duration: 300 });
        translateX.value = withTiming(0, { duration: 300 });
    }, [segments]); // 每当路由片段变化时触发
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
        antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
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
        <Provider>
            <SafeAreaProvider>
                <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
                    <ImageBackground
                        source={require("@/src/assets/images/background.jpg")}
                        resizeMode="cover"
                        // 顶部header部分加上状态栏高度，需要隔开header，
                        style={[styles.background]}>
                        <Animated.View style={[animatedStyle]}>
                            <Slot />
                        </Animated.View>
                    </ImageBackground>
                </SafeAreaView>
            </SafeAreaProvider>
        </Provider>
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
