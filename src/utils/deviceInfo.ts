import * as Device from "expo-device";

const getDeviceInfo = () => ({
    deviceName: Device.deviceName, // 设备名称（用户自定义或系统默认名称）
    osName: String(Device.osName).toLowerCase(), // 操作系统名称（'iOS' 或 'Android'）
    osVersion: Device.osVersion, // 操作系统版本号（格式：主版本.次版本.修订号）
    platformApiLevel: Device.platformApiLevel, // 系统API级别（Android特有，对应SDK版本）
    deviceType: Device.deviceType, // 设备类型（'PHONE' 手机 | 'TABLET' 平板 | 'TV' 电视 | 'DESKTOP' 桌面设备）
    isDevice: Device.isDevice, // 是否真机（模拟器返回false）
    brand: Device.brand, // 设备品牌（如：Apple、Samsung等）
    manufacturer: Device.manufacturer, // 设备制造商
    totalMemory: Device.totalMemory, // 设备总内存（单位：字节，1GB=1073741824字节）
    supportedCpuArchitectures: Device.supportedCpuArchitectures, // 支持的CPU架构列表（如：['arm64-v8a', 'armeabi-v7a']）
});

const deviceInfo = getDeviceInfo(); // 获取设备信息
export default deviceInfo;

export type DeviceInfo = ReturnType<typeof getDeviceInfo>; // 设备信息类型定义，包含所有设备属性字段
