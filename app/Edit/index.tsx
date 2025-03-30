import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useState } from "react";
import { format } from "date-fns";
import deviceInfo from "@/src/utils/deviceInfo";

LocaleConfig.locales["cn"] = {
    monthNames: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
    ],
    monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    dayNames: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    dayNamesShort: ["一", "二", "三", "四", "五", "六", "日"],
    today: "今天",
};
LocaleConfig.defaultLocale = "cn";

const { width, height } = Dimensions.get("window");
console.log("width", width);
console.log("height", height);
export default function Edit() {
    const insets = useSafeAreaInsets();
    const [selectedDate, setSelectedDate] = useState(new Date("2019-05-08"));
    const [showPicker, setShowPicker] = useState(false);

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
                        {showPicker && (
                            <Calendar
                                style={{ height: 500 }}
                                // Initially visible month. Default = now
                                initialDate={"2012-03-01"}
                                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                minDate={"2012-05-10"}
                                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                maxDate={"2012-05-30"}
                                // Handler which gets executed on day press. Default = undefined
                                onDayPress={(day) => {
                                    console.log("selected day", day);
                                }}
                                // Handler which gets executed on day long press. Default = undefined
                                onDayLongPress={(day) => {
                                    console.log("selected day", day);
                                }}
                                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                monthFormat={"yyyy MM"}
                                // Handler which gets executed when visible month changes in calendar. Default = undefined
                                onMonthChange={(month) => {
                                    console.log("month changed", month);
                                }}
                                // Hide month navigation arrows. Default = false
                                hideArrows={true}
                                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                                // Do not show days of other months in month page. Default = false
                                hideExtraDays={true}
                                // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                                // day from another month that is visible in calendar page. Default = false
                                disableMonthChange={true}
                                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                                firstDay={1}
                                // Hide day names. Default = false
                                hideDayNames={true}
                                // Show week numbers to the left. Default = false
                                showWeekNumbers={true}
                                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                                onPressArrowRight={(addMonth) => addMonth()}
                                // Disable left arrow. Default = false
                                disableArrowLeft={true}
                                // Disable right arrow. Default = false
                                disableArrowRight={true}
                                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                                disableAllTouchEventsForDisabledDays={true}
                                // Replace default month and year title with custom one. the function receive a date as parameter
                                renderHeader={(date) => {
                                    /*Return JSX*/
                                }}
                                // Enable the option to swipe between months. Default = false
                                enableSwipeMonths={true}
                            />
                        )}
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.editContainer}>
                <View>
                    <Text>日期</Text>
                </View>
                <View>
                    <Text>标题</Text>
                </View>
                <View>
                    <Text>描述</Text>
                </View>
                <View>
                    <Text>日期</Text>
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
    },
});
