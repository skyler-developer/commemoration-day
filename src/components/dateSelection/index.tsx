import React from "react";
import { View, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import useCardInfoStore from "@/src/stores/cardInfoStore";
import { Calendar, LocaleConfig } from "react-native-calendars";

// 配置中文语言
LocaleConfig.locales["zh"] = {
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
    monthNamesShort: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
    ],
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
    today: "今天",
};
LocaleConfig.defaultLocale = "zh";

const DateSelection: React.FC<{ dateSelect: (date: Date) => void }> = ({ dateSelect }) => {
    const { cardInfo, setDateSelectView, setDate } = useCardInfoStore();

    const onDayPress = (day: { dateString: string }) => {
        dateSelect(new Date(day.dateString));
        setDate(new Date(day.dateString));
        setDateSelectView(false);
    };

    const closeModal = () => {
        setDateSelectView(false);
    };

    console.log("cardInfo.date.dateTime", cardInfo.date.dateTime);

    return (
        <View>
            <Modal
                visible={cardInfo.date.dateSelectView}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Calendar
                                    current={cardInfo.date.dateTime.toISOString().split("T")[0]} // 设置默认显示的日期
                                    onDayPress={onDayPress}
                                    markedDates={{
                                        [cardInfo.date.dateTime.toISOString().split("T")[0]]: {
                                            selected: true,
                                            selectedColor: "#2c2c2c",
                                        },
                                    }}
                                    minDate={"1949-10-01"}
                                    maxDate={"2099-12-31"}
                                    theme={{
                                        selectedDayBackgroundColor: "#2c2c2c",
                                        selectedDayTextColor: "#ffffff",
                                        todayTextColor: "#cccccc",
                                        arrowColor: "#2c2c2c",
                                        monthTextColor: "#2c2c2c",
                                        textMonthFontWeight: "bold",
                                        textDayFontSize: 16,
                                        textMonthFontSize: 18,
                                        textDayHeaderFontSize: 16,
                                        textSectionTitleColor: "#2c2c2c",
                                        dayTextColor: "#2c2c2c",
                                        textDisabledColor: "#e0e0e0",
                                        textDayFontWeight: "500",
                                        textDayHeaderFontWeight: "600",
                                        textMonthFontFamily: "DongQing",
                                        textDayFontFamily: "DongQing",
                                        textDayHeaderFontFamily: "DongQing",
                                        backgroundColor: "#ffffff",
                                        calendarBackground: "#ffffff",
                                        dotColor: "#2c2c2c",
                                    }}
                                    monthFormat={"yyyy年 MM月"}
                                    firstDay={1}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dateButton: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        margin: 10,
    },
    dateText: {
        fontSize: 16,
        color: "#333",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "90%",
        maxWidth: 400,
    },
});

export default DateSelection;
