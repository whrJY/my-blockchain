// Block.js - 区块结构定义
const crypto = require('crypto');

class Block {
    constructor(index, transactions, timestamp, previousHash, nonce = 0) {
        this.index = index;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + 
                   JSON.stringify(this.transactions) + this.nonce)
            .digest('hex');
    }

    // 工作量证明挖矿
    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join("0");
        
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        
        console.log(`区块已挖出: ${this.hash}`);
    }

    // 验证区块中的所有交易
    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Block;