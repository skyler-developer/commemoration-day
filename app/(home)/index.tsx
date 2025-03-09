import { useEffect } from "react";
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    useColorScheme,
    ScrollView,
} from "react-native";
import DeviceInfo from "@/src/utils/deviceInfo";
import Card from "@/src/components/card";
import Header from "@/src/components/header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useColorSchemeStore from "@/src/stores/colorSchemeStore";
export default function HomeScreen() {
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
    return (
        <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
            <ImageBackground
                source={require("@/src/assets/images/background.jpg")}
                resizeMode="cover"
                // 顶部header部分加上状态栏高度，需要隔开header，
                style={[styles.background, { paddingTop: 100 + insets.top }]}>
                <Header />

                <ScrollView
                    style={{ backgroundColor: "transparent" }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
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
        alignItems: "center",
    },
});
