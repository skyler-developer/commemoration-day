import { ScrollView, Button } from "react-native";
import Header from "@/src/components/header";
import Card from "@/src/components/card";
import { Link, router } from "expo-router";
export default function HomeScreen() {
    return (
        <>
            <Header />
            <ScrollView
                style={{ backgroundColor: "transparent" }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Button
                    title="to   Details"
                    onPress={() => {
                        router.navigate("/Details");
                    }}
                />
            </ScrollView>
        </>
    );
}