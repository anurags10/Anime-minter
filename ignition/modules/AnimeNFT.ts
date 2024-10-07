import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import 'dotenv/config';
const owner_address = process.env.OWNER_ADDRESS;

const AnimenftModule = buildModule('AnimenftModule', (a) => {
  // const name: string = 'AnimeNFT';
  // const symbol: string = 'ANFT';
  // const owner = owner_address;

  const animeNFT = a.contract('AnimeNFT',[]);
  return{animeNFT};

})

export default AnimenftModule;
