import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const FUJI_RPC_URL = process.env.FUJI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    fuji: {
      url: FUJI_RPC_URL,
      accounts: [PRIVATE_KEY],
    }
  }
};
// console.log("Sepolia RPC URL:", SEPOLIA_RPC_URL);
// console.log("Private Key:",PRIVATE_KEY);

export default config;
