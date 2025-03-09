import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Header: React.FC = () => {
    const insets = useSafeAreaInsets();
    console.log(insets.top);
    return (
        // 这里的top需要加上insets.top，以隔开状态栏高度
        <View style={[styles.container, { top: insets.top }]}>
            <Text style={styles.firstTitle}>forever</Text>
            <Text style={styles.tapText}>每一个平凡的日子，都值得纪念</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        position: "absolute",
        paddingLeft: 20,
        paddingRight: 20,
        height: 100,
        left: 0,
        // backgroundColor: "red",
    },
    firstTitle: {
        fontFamily: "Conspired",
        color: "#000000DD",
        fontSize: 38,
        // 此文字高度会自动撑开父容器，需要手动设置行高以达到居中效果
        lineHeight: 100,
        fontWeight: 600,
        // backgroundColor: "green",
    },

    tapText: {
        color: "#8A8A8A",
        fontSize: 15,
        fontWeight: 100,
        fontFamily: "DongQing",
    },
});

export default Header;
