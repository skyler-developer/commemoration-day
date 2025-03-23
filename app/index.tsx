import { ScrollView, Button } from "react-native";
import Header from "@/src/components/header";
import Card from "@/src/components/card";
import { router } from "expo-router";
export default function home() {
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
                        router.push("/Details");
                    }}
                />
            </ScrollView>
        </>
    );
}
