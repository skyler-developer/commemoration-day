import apiClient from "../index";

const getCardList = async () => {
    const response = await apiClient.get("/card-manage/get-all");
    console.log(response.data);
    return response.data;
};

export default getCardList;
