import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from "react-native";
import { useMemo, useEffect, useState } from "react";
import { differenceInDays, differenceInSeconds, parseISO, format, parse } from "date-fns";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const ViewHeight = height * 0.25;
const ViewWidth = ViewHeight * 1.6;
const Card: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // 1秒钟更新一次

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View style={styles.card}>
            <ImageBackground
                source={require("@/src/assets/images/with.jpg")}
                resizeMode="cover"
                style={styles.imageBackground}>
                <View style={styles.firstContainer}>
                    <Text style={styles.title}>神奇的西藏</Text>
                    <Text style={styles.secondaryTitle}>第一次去旅游</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.timeContent}>2019-05-08</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 25, // 边框圆角半径为25
        width: ViewWidth,
        height: ViewHeight,
        overflow: "hidden",
        marginBottom: 30,
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
    },
    firstContainer: {
        justifyContent: "flex-start",
        paddingTop: 15,
    },
    title: {
        color: "#FFFFFF",
        fontFamily: "CangErTi",
        fontSize: 19,
        fontWeight: 700,
        marginLeft: 20,
    },
    secondaryTitle: {
        color: "#FFFFFF",
        fontFamily: "CangErTi",
        fontSize: 30,
        fontWeight: 700,
        marginLeft: 20,
    },

    innerContainer: {
        paddingLeft: 20,
        paddingBottom: 15,
    },
    image: {
        width: 25,
        height: 25,
        marginLeft: 10,
        marginRight: 3,
    },
    timeContent: {
        color: "#FFFFFF",
        fontFamily: "CangErTi",
        fontSize: 20,
        fontWeight: 900,
    },
    content: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 300,
        marginLeft: 3,
    },
});

export default Card;
