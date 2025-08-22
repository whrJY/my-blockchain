# 我的区块链项目

这是一个简单但功能完整的区块链项目实现，展示了区块链技术的基本原理和工作机制。

## 项目简介

本项目实现了一个基础的区块链系统，包含以下核心功能：
- 区块创建和链接
- 工作量证明（Proof of Work）机制
- 交易记录和验证
- P2P网络通信基础

## 技术栈

- **后端**: Node.js
- **区块链**: 原生JavaScript实现
- **前端**: HTML/CSS/JavaScript
- **网络**: WebSocket（用于节点间通信）

## 项目结构

```
├── Block.js          # 区块实现
├── Blockchain.js     # 区块链核心逻辑
├── Transaction.js    # 交易实现
├── package.json      # 项目依赖和配置
├── public/
│   └── index.html    # 前端界面
└── server.js         # 服务器和API端点
```

## 功能特点

- **区块链基础功能**:
  - 创建包含多笔交易的区块
  - 通过哈希值链接区块形成不可篡改的链
  - 工作量证明机制确保网络安全

- **交易系统**:
  - 创建和验证数字交易
  - 交易签名和验证
  - 交易池管理

- **网络功能**:
  - P2P节点通信
  - 区块同步
  - 共识机制

## 安装与运行

### 前提条件

- Node.js (建议版本 12.x 或更高)
- npm (Node包管理器)

### 安装步骤

1. 克隆仓库到本地:
   ```bash
   git clone https://github.com/你的用户名/my-blockchain.git
   cd my-blockchain
   ```

2. 安装项目依赖:
   ```bash
   npm install
   ```

### 运行项目

1. 启动服务器:
   ```bash
   npm start
   ```

2. 打开浏览器访问:
   ```
   http://localhost:3000
   ```


