const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp = new Date().toLocaleDateString(), data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString()
  }

}

class BlockChain {
  constructor() {
    const genesisBlock = new Block(0, "01/01/2021", "Genesis Block", "0")
    this.chain = [genesisBlock]
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    // newblock isinya index,timestamp,data
    newBlock.previousHash = this.getLatestBlock().hash 
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
    console.log("hash newblock:",newBlock.hash)
  }

  isValid() {
    
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getHashes(){
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];    
      console.log(currentBlock.hash)
      
    }
  }

}

const juuniCoin = new BlockChain();

console.log(juuniCoin.chain)


juuniCoin.addBlock(new Block(1, "01/02/2021", { value: "Rp 1000.000" }))
juuniCoin.addBlock(new Block(2, "01/03/2021", { value: "Rp 10.000" }))
juuniCoin.addBlock(new Block(3, "01/04/2021", { value: "Rp 1.000" }))

console.log("is this valid chain ?",juuniCoin.isValid())

juuniCoin.chain[2].data = {value:1}

console.log("is this valid chain ?",juuniCoin.isValid())




