import { Injectable } from '@angular/core';
// import Web3 from 'web3';
declare const window: any;
const abi = [
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_todo",
              "type": "string"
          }
      ],
      "name": "add",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_todo",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "_index",
              "type": "uint256"
          }
      ],
      "name": "edit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "list",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_index",
              "type": "uint256"
          }
      ],
      "name": "remove",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
];

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  window: any;

  constructor() { }

  private getAccounts = async () => {
    try {
      return await window.ethereum.request({ method: "eth_accounts" });
    } catch (e) {
      return [];
    }
  }

  public openMetamask = async () => {

    // window.web3 = new Web3(window.ethereum);
    let addresses = await this.getAccounts();
    console.log("service", addresses);

    if (!addresses.length) {
      try {
        addresses = await window.ethereum.enable();
      } catch (e) {
        return false
      }
    }

    return addresses.length ? addresses[0] : null;
  }

  public list = async () => {
    try {
      const contract = new window.web3.eth.Contract(
        abi, "0xD66187d24644Ed8d54538c45167788b7f30fD99C"
      )
      const list = await contract.methods.listGetter().call();
      console.log("list", list);
      return list;
    } catch (error) {
      console.log("error.message");
    }
  }
}
