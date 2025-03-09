import { create } from "zustand";
import { useColorScheme, ColorSchemeName } from "react-native";
type ColorSchemeStore = {
    colorScheme: ColorSchemeName;
    setColorScheme: (scheme: ColorSchemeName) => void;
};
const useColorSchemeStore = create<ColorSchemeStore>()((set) => ({
    colorScheme: "light",
    setColorScheme: (scheme) => set({ colorScheme: scheme }),
}));
export default useColorSchemeStore;
