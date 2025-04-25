# 网络占用测试工具 (Network Usage Test Tool)
[中文](./README.md) [English](./README_EN.md)
## 项目介绍

本项目旨在测试网络在长时间处于高占用状态下的稳定性，尤其是在长时间下载的情况下，网络是否能保持高速稳定的下载速度。该工具支持在线预览，用户可以通过浏览器访问测试页面进行网络占用测试。

项目是开源的，遵循MIT许可协议。前端使用Vue3框架开发，并结合tdesign组件库构建界面。

### 在线预览

您可以通过以下链接访问在线预览页面：

[在线预览地址](https://kill.catiz.eu.org)

### 功能

- 长时间高占用网络测试
- 测试过程中实时显示网络下载速度
- 简单易用的界面

## 安装和使用

1. 克隆项目：

    ```bash
    git clone https://github.com/catiz/DataKiller.git
    ```

2. 安装依赖：

    ```bash
    cd DataKiller
    npm install
    ```

3. 调试项目：

    ```bash
    npm run dev
    ```

4. 打开浏览器并访问 `http://localhost:8080`，即可开始测试。

## 许可证

本项目采用MIT许可协议，详情请参阅 [LICENSE](./LICENSE)。
