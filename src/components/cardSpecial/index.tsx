import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from "react-native";
import { useMemo, useEffect, useState } from "react";
import { differenceInDays, differenceInSeconds, parseISO, format, parse } from "date-fns";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    runOnJS,
    withTiming,
    withSequence,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { Audio } from "expo-av";
import useMeritsCountStore from "@/src/stores/meritsCountStore";

const { width, height } = Dimensions.get("window");

const ViewHeight = height * 0.25;
const ViewWidth = ViewHeight * 1.6;

const Card: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [bubbles, setBubbles] = useState<{ id: number; x: number }[]>([]);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [soundLoaded, setSoundLoaded] = useState(false);
    const { setMeritsCountPlus } = useMeritsCountStore();

    // 创建缩放的共享值
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    // 组件挂载时预加载音频
    useEffect(() => {
        const loadSound = async () => {
            try {
                console.log("预加载音频...");
                const { sound: audioSound } = await Audio.Sound.createAsync(
                    require("@/src/assets/mp3/output.mp3"),
                    { shouldPlay: false }, // 不自动播放，只加载
                );
                setSound(audioSound);
                setSoundLoaded(true);
                console.log("音频预加载完成");
            } catch (error) {
                console.log("音频预加载失败:", error);
            }
        };

        loadSound();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // 1秒钟更新一次

        return () => {
            clearInterval(interval);
        };
    }, []);

    // 清理音频资源
    useEffect(() => {
        return () => {
            if (sound) {
                console.log("清理音频资源");
                sound.unloadAsync();
            }
        };
    }, [sound]);

    // 快速播放预加载的音频
    const playSound = async () => {
        try {
            if (!soundLoaded || !sound) {
                console.log("音频尚未加载完成，跳过播放");
                return;
            }

            console.log("播放预加载的音频...");

            // 重置到开头并播放
            await sound.setPositionAsync(0);
            await sound.playAsync();

            console.log("音频开始播放");
        } catch (error) {
            console.log("音频播放错误:", error);
        }
    };

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

    // 生成随机位置的冒泡
    const generateBubble = () => {
        const newBubble = {
            id: Date.now(),
            x: Math.random() * (ViewWidth - 40) + 20, // 随机x位置，留边距
        };
        setBubbles((prev) => [...prev, newBubble]);

        // 2秒后移除冒泡
        setTimeout(() => {
            setBubbles((prev) => prev.filter((bubble) => bubble.id !== newBubble.id));
        }, 3000);
    };

    // 处理点击事件
    const handlePress = () => {
        console.log("卡片被点击了！");
        generateBubble();
        playSound(); // 播放音频
        setMeritsCountPlus();
        // 这里可以添加导航或其他逻辑
    };

    // 按下时的动画
    const onPressIn = () => {
        scale.value = withSpring(0.99, {
            damping: 80,
            stiffness: 1200,
        });
        opacity.value = withSpring(0.8);
    };

    // 松开时的动画
    const onPressOut = () => {
        scale.value = withSpring(1, {
            damping: 100,
            stiffness: 1000,
        });
        opacity.value = withSpring(1);
    };

    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    // 阴影动画样式（仅 Android）
    const animatedShadowStyle = useAnimatedStyle(() => {
        const elevation = interpolate(scale.value, [0.93, 1], [10, 20]);
        return {
            elevation,
        };
    });

    return (
        <View style={styles.container}>
            <Pressable
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={handlePress}
                delayLongPress={100}>
                <Animated.View style={[styles.card, animatedStyle, animatedShadowStyle]}>
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
                            <Image
                                source={require("@/src/assets/images/心情.png")}
                                style={styles.image}
                            />
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
                </Animated.View>
            </Pressable>

            {/* 冒泡效果容器 */}
            {bubbles.map((bubble) => (
                <BubbleHeart key={bubble.id} x={bubble.x} />
            ))}
        </View>
    );
};

// 冒泡心形组件
const BubbleHeart: React.FC<{ x: number }> = ({ x }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(0.6);

    useEffect(() => {
        // 启动动画
        opacity.value = withSequence(
            withTiming(1, { duration: 1000 }),
            withTiming(0, { duration: 1000 }),
        );

        translateY.value = withTiming(-100, { duration: 2000 });

        scale.value = withSequence(
            withTiming(1, { duration: 1000 }),
            withTiming(0.5, { duration: 1000 }),
        );
    }, []);

    const animatedBubbleStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }, { scale: scale.value }],
    }));

    return (
        <Animated.View style={[styles.bubbleContainer, { left: x }, animatedBubbleStyle]}>
            <Image source={require("@/src/assets/images/心情.png")} style={styles.bubbleImage} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    card: {
        borderRadius: 25, // 边框圆角半径为10
        elevation: 20, // 阴影高度为3（仅适用于Android）
        width: ViewWidth,
        height: ViewHeight,
        overflow: "hidden",
        marginTop: -100,
    },
    bubbleContainer: {
        // 绝对定位是自身左上角，相对于父元素的左上角进行定位的
        // left: 0,top: 0,时，自身左上角与父元素左上角重合
        position: "absolute",

        top: -120, // 卡片上方位置
        zIndex: 1000,
    },
    bubbleImage: {
        width: 20,
        height: 20,
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
