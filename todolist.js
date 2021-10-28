module.exports = [
    { 
        "inputs": [
            { "internalType": "string", "name": "_todo", "type": "string" }
        ],
        "name": "add",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [
            { "internalType": "string", "name": "_todo", "type": "string" },
            { "internalType": "uint256", "name": "_index", "type": "uint256" }
        ],
        "name": "edit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "name": "list",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "listGetter",
        "outputs": [
            { "internalType": "string[]", "name": "", "type": "string[]" }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [
            { "internalType": "uint256", "name": "_index", "type": "uint256" }
        ],
        "name": "remove",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
