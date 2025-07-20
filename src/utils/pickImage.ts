import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const pickImage = async () => {
    // 请求权限
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
        alert("需要访问相册权限才能选择图片！");
        return;
    }

    // 选择图片
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [width, height / 2.1],
        quality: 0.3,
    });

    return result;
};
