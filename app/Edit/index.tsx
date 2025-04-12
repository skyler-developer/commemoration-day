import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { format } from "date-fns";
import DateSelection from "@/src/components/dateSelection";
import { Input } from "@ant-design/react-native";
import useCardInfoStore from "@/src/stores/cardInfoStore";

const { width, height } = Dimensions.get("window");
console.log("width", width);
console.log("height", height);
export default function Edit() {
    const insets = useSafeAreaInsets();
    const { cardInfo, setDateSelectView, setDate } = useCardInfoStore();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [record, setRecord] = useState("");

    const dateSelect = (date: Date) => {
        setDate(date);
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
                        <Text style={styles.startDateText} onPress={() => void 0}>
                            {format(cardInfo.date.dateTime, "yyyy-MM-dd")}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
                <View style={styles.editContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>日期</Text>
                        <TouchableOpacity
                            onPress={() => setDateSelectView(!cardInfo.date.dateSelectView)}
                            style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                            <Input
                                style={styles.input}
                                value={format(cardInfo.date.dateTime, "yyyy-MM-dd")}
                                onChangeText={setTitle}
                                placeholder="请选择日期"
                                placeholderTextColor="#999"
                                allowClear={true}
                                inputStyle={styles.inputText}
                                disabled={true}
                            />
                            <Image
                                source={require("@/src/assets/images/arrow-right.png")}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <DateSelection dateSelect={dateSelect} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>标题</Text>
                        <Input
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="请输入标题"
                            placeholderTextColor="#999"
                            allowClear={true}
                            inputStyle={styles.inputText}
                            maxLength={10}
                            showCount={true}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>描述</Text>
                        <Input
                            style={[styles.input]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="请输入描述"
                            placeholderTextColor="#999"
                            multiline={true}
                            inputStyle={styles.inputText}
                            allowClear={true}
                            maxLength={15}
                            showCount={true}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={[styles.input]}
                            value={record}
                            onChangeText={setRecord}
                            placeholder="请输入记录"
                            placeholderTextColor="#999"
                            multiline={true}
                            inputStyle={[styles.inputText]}
                            allowClear={true}
                            showCount={true}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>保存</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
        paddingBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        // height: 80,
    },
    icon: {
        marginLeft: "auto",
        height: 20,
        width: 20,
    },
    label: {
        fontSize: 16,
        paddingRight: 20,
        color: "#999999",
        fontFamily: "DongQing",
        fontWeight: 700,
    },
    input: {
        flex: 1,
        padding: 0,
        margin: 0,
        textAlign: "left",
    },
    inputText: {
        fontSize: 18,
        padding: 0,
        margin: 0,
        fontFamily: "DongQing",
        color: "#696969FF",
        fontWeight: 700,
        textAlignVertical: "top",
        textAlign: "left",
    },
    buttonContainer: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: "#000",
        borderRadius: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 700,
    },
});
