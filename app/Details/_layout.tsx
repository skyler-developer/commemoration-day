import { Stack } from "expo-router";

export default function DetialsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    animation: "fade_from_bottom",
                    animationDuration: 3000,
                }}
            />
        </Stack>
    );
}
