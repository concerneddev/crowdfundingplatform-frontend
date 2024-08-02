// ----- CONFIG FOR ANVIL -----
export const CONTRACT_ADDRESS_FACTORY_ANVIL = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const ABI_FACTORY_ANVIL = [
    {
        "type": "function",
        "name": "createCampaign",
        "inputs": [{ "name": "goalAmount", "type": "uint256", "internalType": "uint256" }],
        "outputs": [], "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getCampaignContracts",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address[]", "internalType": "contract Campaign[]" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCampaignInfoByOwner",
        "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }],
        "outputs": [
            { "name": "campaignAddress", "type": "address", "internalType": "address" },
            { "name": "goalAmount", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getOwners",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address[]", "internalType": "address[]" }],
        "stateMutability": "view"
    },
    {
        "type": "function", "name": "getRecentCamapaignInfo",
        "inputs": [],
        "outputs": [{ "name": "owner", "type": "address", "internalType": "address" },
        { "name": "campaignAddress", "type": "address", "internalType": "address" },
        { "name": "goalAmount", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function", "name": "getRecentCampaign",
        "inputs": [],
        "outputs": [{ "name": "", "type": "address", "internalType": "contract Campaign" }],
        "stateMutability": "view"
    },
    {
        "type": "function", "name": "getTotalCampaigns",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function", "name": "s_campaigns",
        "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "outputs": [{ "name": "", "type": "address", "internalType": "contract Campaign" }], "stateMutability": "view"
    },
    {
        "type": "function", "name": "s_ownerToCampaigns",
        "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "outputs": [{ "name": "campaignAddress", "type": "address", "internalType": "address" }, { "name": "goalAmount", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function", "name": "s_owners", "inputs":
            [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "event", "name": "CampaignContractCreated",
        "inputs": [{ "name": "campaignContract", "type": "address", "indexed": false, "internalType": "address" }, { "name": "owner", "type": "address", "indexed": false, "internalType": "address" }, { "name": "goalAmount", "type": "uint256", "indexed": false, "internalType": "uint256" }], "anonymous": false
    },
    { "type": "error", "name": "CampaignFactory__InvalidGoalAmount", "inputs": [] },
]