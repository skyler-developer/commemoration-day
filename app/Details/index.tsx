import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
console.log("width", width);
console.log("height", height);
export default function Details() {
    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                source={require("@/src/assets/images/with.jpg")}
                style={{
                    width: "100%",
                    height: height / 2.1,
                    backgroundColor: "green",
                }}></ImageBackground>
            {/* <Text>详情页面内容</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "red",
    },
});
