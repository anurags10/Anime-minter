import { expect } from "chai";
import { ethers } from "hardhat";

describe("AnimeNFT", function () {
  it("Should mint a new NFT and set its token URI", async function () {
    const AnimeNFT = await ethers.getContractFactory("AnimeNFT");
    const animeNFT = await AnimeNFT.deploy();
    // await animeNFT.deployed();

    const mintTx = await animeNFT.mintAnimeNFT(await animeNFT.owner(), "ipfs://sample-token-uri");
    await mintTx.wait();

    const tokenURI = await animeNFT.tokenURI(1);
    expect(tokenURI).to.equal("ipfs://sample-token-uri");
  });
});
