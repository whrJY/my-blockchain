// server.js - 区块链HTTP服务器
const express = require('express');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const cors = require('cors');
const Blockchain = require('./Blockchain');
const Transaction = require('./Transaction');


const app = express();
const port = 3000;

// 创建区块链实例
const myBlockchain = new Blockchain();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // 静态文件服务（区块浏览器）

// 生成新的密钥对
function generateKeyPair() {
    const key = ec.genKeyPair();
    return {
        privateKey: key.getPrivate('hex'),
        publicKey: key.getPublic('hex')
    };
}

// API路由

// 获取区块链状态
app.get('/api/blockchain', (req, res) => {
    res.json({
        chain: myBlockchain.chain,
        pendingTransactions: myBlockchain.pendingTransactions,
        stats: myBlockchain.getNetworkStats()
    });
});

// 获取网络统计信息
app.get('/api/stats', (req, res) => {
    res.json(myBlockchain.getNetworkStats());
});

// 获取所有区块（用于区块浏览器）
app.get('/api/blocks', (req, res) => {
    res.json(myBlockchain.getAllBlocks());
});

// 获取特定区块信息
app.get('/api/blocks/:index', (req, res) => {
    try {
        const blockIndex = parseInt(req.params.index);
        const block = myBlockchain.getBlockInfo(blockIndex);
        res.json(block);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// 创建新用户
app.post('/api/users', (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: '用户名是必需的' });
        }

        // 生成密钥对
        const keyPair = generateKeyPair();

        // 创建用户
        const user = myBlockchain.createUser(username, keyPair.publicKey);
        res.json({
            message: '用户创建成功',
            user: user,
            privateKey: keyPair.privateKey, // 注意：实际应用中不应该返回私钥
            publicKey: keyPair.publicKey
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 获取所有用户
app.get('/api/users', (req, res) => {
    const users = myBlockchain.getAllUsers().map(user => ({
        username: user.username,
        address: user.address,
        balance: myBlockchain.getBalance(user.address),
        createdAt: new Date(user.createdAt).toISOString()
    }));
    res.json(users);
});

// 获取特定用户信息
app.get('/api/users/:username', (req, res) => {
    const user = myBlockchain.getUser(req.params.username);
    if (!user) {
        return res.status(404).json({ error: '用户不存在' });
    }

    res.json({
        username: user.username,
        address: user.address,
        balance: myBlockchain.getBalance(user.address),
        createdAt: new Date(user.createdAt).toISOString(),
        transactions: myBlockchain.getAllTransactionsForWallet(user.address)
    });
});

// 获取地址余额
app.get('/api/balance/:address', (req, res) => {
    const balance = myBlockchain.getBalance(req.params.address);
    res.json({ address: req.params.address, balance });
});

// 创建交易
app.post('/api/transactions', (req, res) => {
    try {
        const { fromAddress, toAddress, amount, privateKey } = req.body;

        if (!fromAddress || !toAddress || !amount || !privateKey) {
            return res.status(400).json({ error: '所有字段都是必需的' });
        }

        // 创建交易
        const transaction = new Transaction(fromAddress, toAddress, parseInt(amount));

        // 使用私钥签名
        const key = ec.keyFromPrivate(privateKey);
        transaction.signTransaction(key);

        // 添加到区块链
        myBlockchain.createTransaction(transaction);
        res.json({
            message: '交易创建成功',
            transaction: transaction
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 挖矿
app.post('/api/mine', (req, res) => {
    try {
        const { minerAddress } = req.body;

        if (!minerAddress) {
            return res.status(400).json({ error: '矿工地址是必需的' });
        }

        const block = myBlockchain.minePendingTransactions(minerAddress);

        res.json({
            message: '挖矿成功！',
            block: block,
            minerReward: myBlockchain.miningReward
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 发行代币（系统功能）
app.post('/api/issue-tokens', (req, res) => {
    try {
        const { toAddress, amount } = req.body;

        if (!toAddress || !amount) {
            return res.status(400).json({ error: '地址和数量都是必需的' });
        }

        myBlockchain.issueTokens(toAddress, parseInt(amount));

        res.json({
            message: `成功发行 ${amount} 代币到 ${toAddress}`,
            pendingTransactions: myBlockchain.pendingTransactions.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 验证区块链
app.get('/api/validate', (req, res) => {
    const isValid = myBlockchain.isChainValid();
    res.json({
        isValid: isValid,
        message: isValid ? '区块链有效' : '区块链无效！'
    });
});

// 生成密钥对（工具接口）
app.post('/api/generate-keypair', (req, res) => {
    const keyPair = generateKeyPair();
    res.json(keyPair);
});
// 获取待处理交易
app.get('/api/transactions/pending', (req, res) => {
    res.json(myBlockchain.pendingTransactions);
});

// 启动服务器
app.listen(port, () => {
    console.log(`区块链服务器运行在 http://localhost:${port}`);
});

module.exports = app;