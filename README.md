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

## 使用说明

### 挖掘新区块

1. 在前端界面点击"挖矿"按钮
2. 系统将自动执行工作量证明算法
3. 成功挖掘后，新区块将被添加到链上

### 创建交易

1. 在前端界面填写交易表单
2. 输入发送方、接收方和交易金额
3. 点击"添加交易"按钮将交易添加到交易池

### 查看区块链状态

- 前端界面会实时显示当前区块链的状态
- 可以查看每个区块的详细信息，包括哈希值、时间戳、交易列表等

## API文档

### 获取区块链

```
GET /blockchain
```

返回完整的区块链数据。

### 挖矿

```
POST /mine
```

触发挖矿过程，返回新创建的区块。

### 添加交易

```
POST /transaction
Content-Type: application/json

{
  "fromAddress": "发送方地址",
  "toAddress": "接收方地址",
  "amount": 交易金额
}
```

添加新交易到交易池。

### 获取节点信息

```
GET /nodes
```

返回网络中已知节点的信息。

## 开发计划

- [ ] 实现更完善的共识算法
- [ ] 添加钱包功能
- [ ] 增强网络安全性
- [ ] 实现智能合约基础功能
- [ ] 添加更多测试用例

## 贡献指南

欢迎提交问题和拉取请求来改进此项目！在贡献之前，请阅读以下指南：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目链接: [https://github.com/你的用户名/my-blockchain](https://github.com/你的用户名/my-blockchain)
- 邮箱: your.email@example.com

## 致谢

感谢所有为区块链技术发展做出贡献的开发者和研究者。
