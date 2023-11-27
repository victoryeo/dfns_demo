import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-waffle";

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "development",
  networks: {
    development: {
      url: "http://127.0.0.1:9545"
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
    
    },
    hardhat: {},
  },
};
