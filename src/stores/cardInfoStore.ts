import { create } from "zustand";
import { format } from "date-fns";

type CardInfo = {
    date: { dateTime: Date; dateSelectView: boolean };
    title: string;
    description: string;
    record: string;
    imageUrl: string;
};

type CardInfoStore = {
    cardInfo: CardInfo;
    setDate: (date: Date) => void;
    setDateSelectView: (dateSelectView: boolean) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setRecord: (record: string) => void;
    setImageUrl: (imageUrl: string) => void;
    resetCardInfo: () => void;
};

const defaultCardInfo: CardInfo = {
    date: { dateTime: new Date(), dateSelectView: false },

    title: "",
    description: "",
    record: "",
    imageUrl: "",
};

const useCardInfoStore = create<CardInfoStore>()((set) => ({
    cardInfo: { ...defaultCardInfo },

    setDate: (date) =>
        set((state) => ({
            cardInfo: {
                ...state.cardInfo,
                date: { dateTime: date, dateSelectView: state.cardInfo.date.dateSelectView },
            },
        })),

    setDateSelectView: (dateSelectView) =>
        set((state) => ({
            cardInfo: {
                ...state.cardInfo,
                date: { dateTime: state.cardInfo.date.dateTime, dateSelectView },
            },
        })),

    setTitle: (title) =>
        set((state) => ({
            cardInfo: { ...state.cardInfo, title },
        })),

    setDescription: (description) =>
        set((state) => ({
            cardInfo: { ...state.cardInfo, description },
        })),

    setRecord: (record) =>
        set((state) => ({
            cardInfo: { ...state.cardInfo, record },
        })),

    setImageUrl: (imageUrl) =>
        set((state) => ({
            cardInfo: { ...state.cardInfo, imageUrl },
        })),

    resetCardInfo: () =>
        set({
            cardInfo: { ...defaultCardInfo },
        }),
}));

export default useCardInfoStore;
