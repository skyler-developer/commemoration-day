import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    ScrollView,
    TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { format } from "date-fns";
import deviceInfo from "@/src/utils/deviceInfo";
import DateSelection from "@/src/components/dateSelection";

const { width, height } = Dimensions.get("window");
console.log("width", width);
console.log("height", height);
export default function Edit() {
    const insets = useSafeAreaInsets();
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date("2019-05-08"));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [record, setRecord] = useState("");

    const dateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                source={require("@/src/assets/images/with.jpg")}
                style={[styles.imageContainer, { paddingTop: insets.top + 5 }]}>
                <View style={styles.innerContainer}>
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitleText}>神奇的西藏</Text>
                        <Text style={[styles.subtitleText, { color: "red" }]}>删除</Text>
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
                        <Text style={styles.startDateText} onPress={() => setShowPicker(true)}>
                            {format(selectedDate, "yyyy-MM-dd")}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <DateSelection dateSelect={dateSelect} />
            <View style={styles.editContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>标题</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="请输入标题"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>描述</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="请输入描述"
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={3}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>记录</Text>
                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        value={record}
                        onChangeText={setRecord}
                        placeholder="请输入记录"
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={4}
                    />
                </View>
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

    editContainer: {
        flex: 1,
        backgroundColor: "#f6f6f7",
        padding: 15,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: "#333",
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    multilineInput: {
        height: 100,
        textAlignVertical: "top",
    },
});
