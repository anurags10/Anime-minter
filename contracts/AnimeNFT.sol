// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AnimeNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("AnimeNFT", "ANFT") Ownable(msg.sender) {
        _tokenIdCounter = 1; // Initialize token counter at 1
    }

    // Mint function to create an NFT and assign a token URI
    function mintAnimeNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = _tokenIdCounter;
        _tokenIdCounter += 1;

        _mint(recipient, newItemId);  // Mint the NFT to the recipient
        _setTokenURI(newItemId, tokenURI); // Set the metadata URI

        return newItemId;  // Return the new token ID
    }
}
