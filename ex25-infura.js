/*
Windows only: npm install -g --production windows-build-tools
npm install --save truffle-hdwallet-provider
npm install --save solc
npm install --save ganache-cli
npm install --save web3
npm install --save config

*/

const ganache = require('ganache-cli');
const Web3 = require('web3');
const config = require('config');
const solc = require('solc'); // npm install -g solc
const path = require('path');
const fs = require('fs');


infuraURL = "https://mainnet.infura.io/" + infuraAccessKey
marriageContract = await new web3.eth.Contract(JSON.parse(compiled.interface),'0x3970abfB6b304f54B6Ac0D0D96DDe33b473d170C');