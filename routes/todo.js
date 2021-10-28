var express   = require("express"),
    router    = express.Router(),
    Tx        = require('ethereumjs-tx').Transaction;

const Web3 = require('web3');
const RINKEBY_API_URL = "https://rinkeby.infura.io/v3/24b124e04d8b46909f71512dad775a9d";
const provider = new Web3.providers.HttpProvider(RINKEBY_API_URL);
const web3 = new Web3(provider);
const ABI = require("../todolist");
const CONTRACT_ADDRESS = "0xD66187d24644Ed8d54538c45167788b7f30fD99C";
const SENDER_ADDRESS = "0x240eBB3C0aA32b29777B49CB8D5106B1b9FcF65B";
const SENDER_PRIVATE_KEY = "93e5a7ee9e81daee7a12a0a94816aec34c0345bf7d7f33624500fec4a3dfa984";

const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
web3.eth.defaultAccount = SENDER_ADDRESS

router.get('/', async (req, res, next) => {
  let list = await myContract.methods.listGetter().call();
  res.json(list);
});

router.get('/:index', async (req, res, next) => {
    res.send("first todo");
});

router.post('/', async (req, res, next) => {
  let data = await myContract.methods.add(req.body.todo).encodeABI();

  web3.eth.getTransactionCount(SENDER_ADDRESS, (err, txCount) => {
    // Build the transaction
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       CONTRACT_ADDRESS,
      value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
      gasLimit: web3.utils.toHex(2100000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      data: data  
    }
    // Sign the transaction
    const tx = new Tx(txObject, { chain: 'rinkeby' });
    const privateKey1 = Buffer.from(SENDER_PRIVATE_KEY, 'hex');
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    // Broadcast the transaction
    web3.eth.sendSignedTransaction(raw)
    .on('transactionHash', function(hash){ console.log("tx: " + hash); res.send(hash); })
    .on('error', function(error){ console.error(error); res.status(400).send(error); })
  });
});

router.put('/:index', async (req, res, next) => {
  let data = await myContract.methods.edit(req.body.todo, parseInt(req.params.index)).encodeABI();

  web3.eth.getTransactionCount(SENDER_ADDRESS, (err, txCount) => {
    // Build the transaction
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       CONTRACT_ADDRESS,
      value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
      gasLimit: web3.utils.toHex(2100000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      data: data  
    }
    // Sign the transaction
    const tx = new Tx(txObject, { chain: 'rinkeby' });
    const privateKey1 = Buffer.from(SENDER_PRIVATE_KEY, 'hex');
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    // Broadcast the transaction
    web3.eth.sendSignedTransaction(raw)
    .on('transactionHash', function(hash){ console.log("tx: " + hash); res.send(hash); })
    .on('error', function(error){ console.error(error); res.status(400).send(error); })
  });
});

router.delete('/:index', async (req, res, next) => {
  let data = await myContract.methods.remove(parseInt(req.params.index)).encodeABI();

  web3.eth.getTransactionCount(SENDER_ADDRESS, (err, txCount) => {
    // Build the transaction
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      to:       CONTRACT_ADDRESS,
      value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
      gasLimit: web3.utils.toHex(2100000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      data: data  
    }
    // Sign the transaction
    const tx = new Tx(txObject, { chain: 'rinkeby' });
    const privateKey1 = Buffer.from(SENDER_PRIVATE_KEY, 'hex');
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    // Broadcast the transaction
    web3.eth.sendSignedTransaction(raw)
    .on('transactionHash', function(hash){ console.log("tx: " + hash); res.send(hash); })
    .on('error', function(error){ console.error(error); res.status(400).send(error); })
  });
});

module.exports = router;