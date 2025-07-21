import React from "react";
import { ScrollView, Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import Header from "@/src/components/header";
import CardSpecial from "@/src/components/cardSpecial";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useMeritsCountStore from "@/src/stores/meritsCountStore";
export default function home() {
    const insets = useSafeAreaInsets();
    const { meritsCount } = useMeritsCountStore();
    console.log(insets.top);
    return (
        <>
            <ImageBackground
                source={require("@/src/assets/images/background.jpg")}
                resizeMode="cover"
                // 顶部header部分加上状态栏高度，需要隔开header，
                style={[styles.background, { paddingTop: insets.top }]}>
                <View style={{ height: 100, marginTop: 150, marginBottom: 150 }}>
                    <Text
                        style={{
                            color: "rgb(248, 65, 65)",
                            fontFamily: "CangErTi",
                            fontSize: 24,
                            fontWeight: 900,
                            marginLeft: 10,
                            textShadowColor: "rgba(248, 65, 65, 0.5)",
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 3,
                        }}>
                        功德值：{meritsCount}
                    </Text>
                </View>
                <CardSpecial />
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        // 这里是暂时的，为了让卡片居上一点
        paddingBottom: 0,
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
