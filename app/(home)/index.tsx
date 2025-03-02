import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Card from "@/components/card";
import Header from "@/components/header";
export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("@/assets/images/background.jpg")}
                resizeMode="cover"
                style={styles.background}>
                <Header />
                <Card />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    background: {
        flex: 1,
        paddingBottom: 80,
        justifyContent: "center",
        alignItems: "center",
    },
});
