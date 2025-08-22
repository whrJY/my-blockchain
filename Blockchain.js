// Blockchain.js - 主区块链类
const Block = require('./Block');
const Transaction = require('./Transaction');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; // 挖矿难度
        this.pendingTransactions = []; // 待处理交易
        this.miningReward = 10; // 挖矿奖励
        this.users = new Map(); // 用户账户系统
    }

    // 创建创世区块
    createGenesisBlock() {
        return new Block(0, [], Date.now(), "0");
    }

    // 获取最新区块
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // 获取区块高度
    getBlockHeight() {
        return this.chain.length - 1;
    }

    // 创建新用户
    createUser(username, publicKey) {
        if (this.users.has(username)) {
            throw new Error('用户名已存在');
        }
        
        const user = {
            username,
            publicKey,
            address: publicKey, // 使用公钥作为地址
            balance: 0,
            createdAt: Date.now()
        };
        
        this.users.set(username, user);
        console.log(`用户 ${username} 创建成功`);
        return user;
    }

    // 获取用户信息
    getUser(username) {
        return this.users.get(username);
    }

    // 获取所有用户
    getAllUsers() {
        //根据index排序用户
        return Array.from(this.users.values()).sort((a, b) => a.index - b.index);
    }

    // 挖矿处理待处理交易
    minePendingTransactions(miningRewardAddress) {
        // 添加挖矿奖励交易
        const rewardTransaction = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTransaction);

        const block = new Block(
            this.chain.length,
            this.pendingTransactions,
            Date.now(),
            this.getLatestBlock().hash
        );
        
        block.mineBlock(this.difficulty);
        
        console.log('区块挖矿成功！');
        this.chain.push(block);
        
        this.pendingTransactions = []; // 清空待处理交易
        return block;
    }

    // 创建交易
    createTransaction(transaction) {
        // 验证交易
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('交易必须包含发送和接收地址');
        }

        if (!transaction.isValid()) {
            throw new Error('无法添加无效交易到链中');
        }

        // 检查余额
        if (this.getBalance(transaction.fromAddress) < transaction.amount) {
            throw new Error('余额不足');
        }

        this.pendingTransactions.push(transaction);
        console.log('交易已添加到待处理队列');
    }

    // 获取地址余额
    getBalance(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    // 获取地址的所有交易
    getAllTransactionsForWallet(address) {
        const txs = [];

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.fromAddress === address || tx.toAddress === address) {
                    txs.push(tx);
                }
            }
        }

        return txs;
    }

    // 验证区块链
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

    // 代币发行（只能由系统执行）
    issueTokens(toAddress, amount) {
        const transaction = new Transaction(null, toAddress, amount);
        this.pendingTransactions.push(transaction);
        console.log(`发行 ${amount} 代币到地址 ${toAddress}`);
    }

    // 获取区块信息
    getBlockInfo(index) {
        if (index < 0 || index >= this.chain.length) {
            throw new Error('区块索引无效');
        }
        return this.chain[index];
    }

    // 获取所有区块信息（用于区块浏览器）
    getAllBlocks() {
        return this.chain.map((block, index) => ({
            index: block.index,
            hash: block.hash,
            previousHash: block.previousHash,
            timestamp: new Date(block.timestamp).toISOString(),
            transactionCount: block.transactions.length,
            nonce: block.nonce
        }));
    }
   
    // 根据哈希获取区块
    getBlockByHash(hash) {
        return this.chain.find(block => block.hash === hash);
    }
     // 获取区块链信息
    getNetworkStats() {
        return {
            blockHeight: this.getBlockHeight(),
            totalTransactions: this.chain.reduce((total, block) => total + block.transactions.length, 0),
            pendingTransactions: this.pendingTransactions.length,
            difficulty: this.difficulty,
            totalUsers: this.users.size,
            isValid: this.isChainValid(),
            latestBlock: this.getLatestBlock(),
        };
    }
}

module.exports = Blockchain;