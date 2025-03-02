import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header: React.FC = () => {
    return (
        <View style={styles.container}>
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
        left: 0,
        top: 0,
    },
    firstTitle: {
        fontFamily: "Conspired",
        color: "#000000DD",
        fontSize: 36,
        lineHeight: 100,
        fontWeight: 600,
    },

    tapText: {
        color: "#8A8A8A",
        fontSize: 15,
        fontWeight: 100,
        fontFamily: "DongQing",
    },
});

export default Header;
