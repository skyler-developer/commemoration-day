import React, { useEffect } from "react";
import { ScrollView, Button, ImageBackground, StyleSheet } from "react-native";
import Header from "@/src/components/header";
import Card from "@/src/components/card";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getCardList from "@/src/api/cardManage/getCardList";
export default function home() {
    const insets = useSafeAreaInsets();
    console.log(insets.top);
    useEffect(() => {
        getCardList();
    }, []);
    return (
        <>
            <ImageBackground
                source={require("@/src/assets/images/background.jpg")}
                resizeMode="cover"
                // 顶部header部分加上状态栏高度，需要隔开header，
                style={[styles.background, { paddingTop: insets.top }]}>
                <ScrollView
                    style={{ backgroundColor: "transparent" }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <Header />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Button
                        title="to   Details"
                        onPress={() => {
                            router.push("/Details");
                        }}
                    />
                </ScrollView>
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
        // alignItems: "center",
    },
});
