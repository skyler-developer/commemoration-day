import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from "react-native";
import { useMemo, useEffect, useState } from "react";
import { differenceInDays, differenceInSeconds, parseISO, format, parse } from "date-fns";

const { width, height } = Dimensions.get("window");

const ViewHeight = height * 0.25;
const ViewWidth = ViewHeight * 1.6;
const Card: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // 1秒钟更新一次

        return () => {
            clearInterval(interval);
        };
    }, []);

    const days = useMemo(() => {
        const startDate = "2024-11-24 23:00";
        const startDateObj = parse(startDate, "yyyy-MM-dd HH:mm", new Date());
        const sendsDifference = differenceInSeconds(currentDate, startDateObj);
        const daysInfo = {
            days: Math.floor(sendsDifference / (24 * 60 * 60)),
            hours: Math.floor((sendsDifference % (24 * 60 * 60)) / (60 * 60)),
            minutes: Math.floor((sendsDifference % (60 * 60)) / 60),
            seconds: Math.floor(sendsDifference % 60),
        };
        return daysInfo;
    }, [currentDate]);

    return (
        <View style={styles.card}>
            <ImageBackground
                source={require("@/src/assets/images/with.jpg")}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: "100%",
                }}>
                <View>
                    <Text style={styles.title}>与宝宝的恋爱纪念</Text>
                </View>
                <View style={styles.firstContainer}>
                    <Image source={require("@/src/assets/images/心情.png")} style={styles.image} />
                    <Text style={styles.secondaryTitle}>距今已经</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.timeContent}>{days.days}</Text>
                    <Text style={styles.content}>天</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.timeContent}>{days.hours}</Text>
                    <Text style={styles.content}>小时</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.timeContent}>{days.minutes}</Text>
                    <Text style={styles.content}>分钟</Text>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.timeContent}>{days.seconds}</Text>
                    <Text style={styles.content}>秒</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 25, // 边框圆角半径为10
        elevation: 20, // 阴影高度为3（仅适用于Android）
        width: ViewWidth,
        height: ViewHeight,
        overflow: "hidden",
    },
    title: {
        color: "#FFFFFF",
        fontFamily: "CangErTi",
        fontSize: 21,
        fontWeight: 700,
        marginLeft: 10,
        marginTop: 8,
    },
    secondaryTitle: {
        color: "#FFFFFF",
        fontFamily: "CangErTi",
        fontSize: 18,
        fontWeight: 700,
    },
    firstContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
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
        marginLeft: 10,
    },
    content: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: 300,
        marginLeft: 3,
    },
});

export default Card;
