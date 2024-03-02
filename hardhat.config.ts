import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades"
require('dotenv').config();
var global: any = {}
const fs = require("fs");

function prepareConfig() {
  // expected config path
  const configPath = `${__dirname}/deployment_config.js`;

  // create dummy object if deployment config doesn't exist
  // for compilation purposes
  if (fs.existsSync(configPath)) {
    global.DeploymentConfig = require(configPath);
  } else {
    global.DeploymentConfig = {};
  }
}
prepareConfig();
const config = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
  networks: {
    opBNBTestnet: {
      chainId: 5611,
      url: global.DeploymentConfig.opBNBTestnet.rpc,
      accounts: [
        `${global.DeploymentConfig.opBNBTestnet.mnemonic}`,
      ],
      loggingEnabled: true,
      throwOnTransactionFailures: true,
    },
    binance: {
        chainId: 56,
        url: global.DeploymentConfig.binance.rpc,
        accounts: [
            `${global.DeploymentConfig.binance.mnemonic}`,
        ],
        loggingEnabled: true,
        throwOnTransactionFailures: true,
    },
    bscTestnet: {
      chainId: 97,
      url: global.DeploymentConfig.bscTestnet.rpc,
      accounts: [
        `${global.DeploymentConfig.bscTestnet.mnemonic}`,
      ],
      loggingEnabled: true,
      throwOnTransactionFailures: true,
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCSCAN_API_KEY || "",
      bsc: process.env.BSCSCAN_API_KEY || "",
      opBNBTestnet:"4WYQ8AW7BTSPR8STZBNEP77AKPQPYMURP3",
    },
    customChains: [
      {
        network: "opBNBTestnet",
        chainId: 5611,
        urls: {
          apiURL: "https://api-opbnb-testnet.bscscan.com/api",
          browserURL: "https://opbnb-testnet.bscscan.com"
        }
      }
    ]
  },
  
};

export default config;
