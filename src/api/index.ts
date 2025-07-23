// 新建axios实例逻辑，封装请求前置拦截器，后置拦截器，响应拦截器
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// 定义响应数据的通用接口
interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
    success: boolean;
}

// 定义请求配置的扩展接口
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    skipAuth?: boolean; // 是否跳过 token 验证
    showLoading?: boolean; // 是否显示加载状态
    showError?: boolean; // 是否显示错误提示
}

class ApiClient {
    private instance: AxiosInstance;
    private baseURL = "http://192.168.1.6:3000"; // 替换为你的 API 基础地址

    constructor() {
        // 创建 axios 实例
        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 5000, // 5秒超时
            headers: {
                "Content-Type": "application/json",
            },
        });

        // 设置请求拦截器
        this.setupRequestInterceptor();

        // 设置响应拦截器
        this.setupResponseInterceptor();
    }

    // 请求拦截器
    private setupRequestInterceptor() {
        this.instance.interceptors.request.use(
            async (config) => {
                console.log("📤 发起请求:", {
                    url: config.url,
                    method: config.method,
                    params: config.params,
                    data: config.data,
                });
                console.log("config", config);
                console.log("config.url", config.url);
                // 添加 token（如果需要且不跳过认证）
                // 注意：需要先安装 @react-native-async-storage/async-storage
                /*
                if (!config.skipAuth) {
                    try {
                        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
                        const token = await AsyncStorage.getItem('access_token');
                        if (token) {
                            config.headers = {
                                ...config.headers,
                                Authorization: `Bearer ${token}`,
                            };
                        }
                    } catch (error) {
                        console.error('获取 token 失败:', error);
                    }
                }
                */

                // 添加请求时间戳
                if (config.headers) {
                    config.headers["X-Request-Time"] = Date.now().toString();
                }

                // 显示加载状态（可选，需要配合全局状态管理）
                // if (config.showLoading !== false) {
                //     // 这里可以调用你的 loading store
                //     // useLoadingStore.getState().setLoading(true);
                // }

                return config;
            },
            (error: AxiosError) => {
                console.error("📤 请求拦截器错误:", error);
                return Promise.reject(error);
            },
        );
    }

    // 响应拦截器
    private setupResponseInterceptor() {
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log("📥 收到响应:", {
                    url: response.config.url,
                    status: response.status,
                    data: response.data,
                });

                // 隐藏加载状态
                // useLoadingStore.getState().setLoading(false);

                // 如果后端返回的是标准格式，进行处理
                if (response.data && typeof response.data === "object") {
                    const { code, message, data, success } = response.data;

                    // 根据业务状态码处理
                    if (success || code === 200 || code === 0) {
                        // 成功响应，返回原始响应
                        return response;
                    } else if (code === 401) {
                        // token 过期或无效
                        this.handleTokenExpired();
                        return Promise.reject(new Error(message || "登录已过期"));
                    } else if (code === 403) {
                        // 权限不足
                        console.error("权限不足:", message);
                        return Promise.reject(new Error(message || "权限不足"));
                    } else {
                        // 其他业务错误
                        console.error("业务错误:", message);
                        return Promise.reject(new Error(message || "请求失败"));
                    }
                }

                // 如果不是标准格式，直接返回
                return response;
            },
            (error: AxiosError) => {
                console.error("📥 响应拦截器错误:", error);

                // 隐藏加载状态
                // useLoadingStore.getState().setLoading(false);

                // 处理网络错误
                if (!error.response) {
                    // 网络连接错误
                    console.error("网络连接失败");
                    return Promise.reject(new Error("网络连接失败，请检查网络设置"));
                }

                const { status } = error.response;
                let errorMessage = "请求失败";

                switch (status) {
                    case 400:
                        errorMessage = "请求参数错误";
                        break;
                    case 401:
                        errorMessage = "登录已过期";
                        this.handleTokenExpired();
                        break;
                    case 403:
                        errorMessage = "权限不足";
                        break;
                    case 404:
                        errorMessage = "请求资源不存在";
                        break;
                    case 500:
                        errorMessage = "服务器内部错误";
                        break;
                    case 502:
                        errorMessage = "网关错误";
                        break;
                    case 503:
                        errorMessage = "服务不可用";
                        break;
                    default:
                        errorMessage = `请求失败 (${status})`;
                }

                console.error("HTTP 错误:", errorMessage);
                return Promise.reject(new Error(errorMessage));
            },
        );
    }

    // 处理 token 过期
    private async handleTokenExpired() {
        try {
            // 清除本地 token
            // 注意：需要先安装 @react-native-async-storage/async-storage
            /*
            const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user_info']);
            */

            // 这里可以跳转到登录页面
            // 例如：NavigationService.navigate('Login');
            console.log("Token 已过期，请重新登录");
        } catch (error) {
            console.error("清除 token 失败:", error);
        }
    }

    // GET 请求
    get<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.get(url, config);
    }

    // POST 请求
    post<T = any>(
        url: string,
        data?: any,
        config?: CustomAxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.instance.post(url, data, config);
    }

    // PUT 请求
    put<T = any>(
        url: string,
        data?: any,
        config?: CustomAxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.instance.put(url, data, config);
    }

    // DELETE 请求
    delete<T = any>(url: string, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.delete(url, config);
    }

    // 文件上传
    upload<T = any>(
        url: string,
        formData: FormData,
        config?: CustomAxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.instance.post(url, formData, {
            ...config,
            headers: {
                ...config?.headers,
                "Content-Type": "multipart/form-data",
            },
        });
    }

    // 设置 token（需要先安装 AsyncStorage）
    async setToken(token: string) {
        try {
            // const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            // await AsyncStorage.setItem('access_token', token);
            console.log("设置 token:", token);
        } catch (error) {
            console.error("保存 token 失败:", error);
        }
    }

    // 清除 token（需要先安装 AsyncStorage）
    async clearToken() {
        try {
            // const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            // await AsyncStorage.removeItem('access_token');
            console.log("清除 token");
        } catch (error) {
            console.error("清除 token 失败:", error);
        }
    }

    // 获取原始 axios 实例（用于特殊需求）
    getInstance(): AxiosInstance {
        return this.instance;
    }
}

// 创建并导出 API 客户端实例
const apiClient = new ApiClient();

export default apiClient;
