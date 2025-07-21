import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type meritsCountStore = {
    meritsCount: number;
    setMeritsCountPlus: () => void;
    setMeritsCount: (meritsCount: number) => void;
};

const useMeritsCountStore = create<meritsCountStore>()(
    persist(
        (set) => ({
            meritsCount: 0,
            setMeritsCountPlus: () => set((state) => ({ meritsCount: state.meritsCount + 1 })),
            setMeritsCount: (count) => set({ meritsCount: count }),
        }),
        {
            name: "merits-count-storage",
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export default useMeritsCountStore;
