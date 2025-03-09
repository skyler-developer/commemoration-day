import { ScrollView, Button } from "react-native";
import Card from "@/src/components/card";
import { Link, router } from "expo-router";
export default function HomeScreen() {
    return (
        <>
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
                        router.push("/Details");
                    }}
                />
            </ScrollView>
        </>
    );
}
