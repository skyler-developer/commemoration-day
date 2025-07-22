// API 使用示例
import apiClient from "./index";

// 使用示例
export const apiExamples = {
    // GET 请求示例
    async getUserInfo(userId: string) {
        try {
            const response = await apiClient.get(`/user/${userId}`);
            console.log("用户信息:", response.data);
            return response.data;
        } catch (error) {
            console.error("获取用户信息失败:", error);
            throw error;
        }
    },

    // POST 请求示例
    async createUser(userData: { name: string; email: string }) {
        try {
            const response = await apiClient.post("/user", userData);
            console.log("创建用户成功:", response.data);
            return response.data;
        } catch (error) {
            console.error("创建用户失败:", error);
            throw error;
        }
    },

    // 跳过认证的请求示例
    async getPublicData() {
        try {
            const response = await apiClient.get("/public/data", {
                skipAuth: true, // 跳过 token 验证
            });
            return response.data;
        } catch (error) {
            console.error("获取公开数据失败:", error);
            throw error;
        }
    },

    // 文件上传示例
    async uploadImage(imageUri: string) {
        try {
            const formData = new FormData();
            formData.append("image", {
                uri: imageUri,
                type: "image/jpeg",
                name: "image.jpg",
            } as any);

            const response = await apiClient.upload("/upload/image", formData);
            console.log("上传成功:", response.data);
            return response.data;
        } catch (error) {
            console.error("上传失败:", error);
            throw error;
        }
    },

    // 登录示例
    async login(username: string, password: string) {
        try {
            const response = await apiClient.post(
                "/auth/login",
                {
                    username,
                    password,
                },
                {
                    skipAuth: true, // 登录请求不需要 token
                },
            );

            // 登录成功后保存 token
            if (response.data.token) {
                await apiClient.setToken(response.data.token);
            }

            return response.data;
        } catch (error) {
            console.error("登录失败:", error);
            throw error;
        }
    },

    // 登出示例
    async logout() {
        try {
            await apiClient.post("/auth/logout");
            // 清除本地 token
            await apiClient.clearToken();
        } catch (error) {
            console.error("登出失败:", error);
            throw error;
        }
    },
};
