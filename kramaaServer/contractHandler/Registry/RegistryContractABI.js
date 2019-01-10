const ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "contractAddress",
				"type": "address"
			},
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "description",
				"type": "bytes32"
			},
			{
				"name": "tokenName",
				"type": "bytes32"
			},
			{
				"name": "tokenSymbol",
				"type": "bytes32"
			},
			{
				"name": "organizationName",
				"type": "bytes32"
			}
		],
		"name": "addNewProject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "organizationName",
				"type": "bytes32"
			},
			{
				"name": "managerAddresses",
				"type": "address[]"
			},
			{
				"name": "ownerAddress",
				"type": "address"
			}
		],
		"name": "addOrganizationDetails",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "organizationName",
				"type": "bytes32"
			}
		],
		"name": "getProjectAddressesFromOrganizationName",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "projectName",
				"type": "bytes32"
			}
		],
		"name": "getProjectFromProjectName",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "organizationProjectRegistries",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "organizationRegistries",
		"outputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "ownerAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "projectAddressMapping",
		"outputs": [
			{
				"name": "contractAddress",
				"type": "address"
			},
			{
				"name": "description",
				"type": "bytes32"
			},
			{
				"name": "tokenName",
				"type": "bytes32"
			},
			{
				"name": "tokenSymbol",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "projectRegistries",
		"outputs": [
			{
				"name": "contractAddress",
				"type": "address"
			},
			{
				"name": "description",
				"type": "bytes32"
			},
			{
				"name": "tokenName",
				"type": "bytes32"
			},
			{
				"name": "tokenSymbol",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

module.exports = ABI;
