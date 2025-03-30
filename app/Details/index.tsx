import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    ScrollView,
    Button,
    TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");
console.log("width", width);
console.log("height", height);
export default function Details() {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                source={require("@/src/assets/images/with.jpg")}
                style={[styles.imageContainer, { paddingTop: insets.top + 5 }]}>
                <View style={styles.innerContainer}>
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitleText}>神奇的西藏</Text>
                        <TouchableOpacity
                            onPress={() => {
                                router.push("../Edit");
                            }}>
                            <Text style={styles.subtitleText}>编辑</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainTitleContainer}>
                        <Text style={styles.mainTitleText}>第一次去旅游</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <View style={styles.timeItem}>
                            <Text style={styles.timeText}>01</Text>
                            <Text style={styles.timeUnderText}>年</Text>
                        </View>
                        <View style={styles.timeItem}>
                            <Text style={styles.timeText}>04</Text>
                            <Text style={styles.timeUnderText}>月</Text>
                        </View>
                        <View style={styles.timeItem}>
                            <Text style={styles.timeText}>06</Text>
                            <Text style={styles.timeUnderText}>日</Text>
                        </View>
                    </View>
                    <View style={styles.startDateContainer}>
                        <Text style={styles.startDateText}>2019-05-08</Text>
                    </View>
                </View>
            </ImageBackground>
            <View
                style={[
                    styles.describeContainer,
                    // 待确认：android/ios表现是否一致
                    { maxHeight: height - height / 2.1 + insets.top },
                ]}>
                <ScrollView
                    style={styles.describeScrollContainer}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.describeInnerContainer}>
                        <Text style={styles.describeText}>
                            西藏是一个以藏族为主的民族国家，它的历史和文化都与藏族文化密不可分。
                            西藏的历史可以追溯到19世纪，当时，西藏被称为“西藏国”，
                            是一个独立的国家。 西藏的文化也非常丰富， 它的传统美食有很多，
                            比如藏族菜、藏族茶、藏族酒等。 西藏的文化也非常重要，
                            西藏是一个以藏族为主的民族国家，它的历史和文化都与藏族文化密不可分。
                            西藏是一个以藏族为主的民族国家，它的历史和文化都与藏族文化密不可分。
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        width: "100%",
        height: height / 2.1,
    },
    innerContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },

    subtitleContainer: { flexDirection: "row", justifyContent: "space-between" },
    subtitleText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 700,
    },
    mainTitleContainer: { paddingTop: 10, flexDirection: "row", justifyContent: "space-between" },
    mainTitleText: {
        fontSize: 26,
        color: "#fff",
        fontWeight: 700,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 100,
        paddingLeft: 80,
        paddingRight: 80,
    },

    timeItem: {
        alignItems: "center",
    },

    timeText: {
        fontSize: 30,
        color: "#fff",
        fontFamily: "CangErTi",
        fontWeight: 700,
    },
    timeUnderText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "CangErTi",
        fontWeight: 700,
    },

    startDateContainer: {
        marginTop: "auto",
    },

    startDateText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 700,
    },

    describeContainer: {
        padding: 10,
    },
    describeScrollContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
    },
    describeInnerContainer: {
        padding: 10,
    },
    describeText: {
        fontSize: 17,
        color: "#717171FF",
    },
});
