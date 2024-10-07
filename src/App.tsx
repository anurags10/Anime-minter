import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { uploadToIPFS, uploadJSONToIPFS } from './metadata/metadata';
import AnimeNFT from './contractJSON/animenft.json'; // Update this path as necessary
import './App.css';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({ title: '', description: '' });
  const [contractAddress, setContractAddress] = useState<string>('0xf04F0BbC4B63EB26e8aA86241E8ccB3Ae9A62609'); // Replace with your contract address
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload()); // Reload the page if the network changes

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Use await here
      setProvider(provider);
      setSigner(signer);

      await provider.send("eth_requestAccounts", []);
      const address = await signer.getAddress();
      setUserAddress(address);
      console.log("Wallet connected:", address);
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length > 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Use await here
      setSigner(signer);
      const address = await signer.getAddress();
      setUserAddress(address);
      console.log("Account changed to:", address);
    } else {
      console.log("No accounts found. Please connect to MetaMask.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (file && signer) {
      const ipfsHash = await uploadToIPFS(file);
      console.log('Uploaded file IPFS Hash:', ipfsHash);

      const jsonHash = await uploadJSONToIPFS(metadata);
      console.log('Uploaded JSON IPFS Hash:', jsonHash);

      // Ensure signer address is defined
      const address = await signer.getAddress();
      if (address && jsonHash) { // Check if both address and jsonHash are defined
        // Interact with the contract
        const animeNFTContract = new ethers.Contract(contractAddress, AnimeNFT.abi, signer);
        const mintTx = await animeNFTContract.mintAnimeNFT(address, jsonHash);
        await mintTx.wait();
        console.log('Minted NFT with transaction:', mintTx);
      } else {
        console.error('Address or JSON Hash is undefined');
      }
    }
  };

  return (
    <div>
      <h1>Upload Anime Work</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {userAddress && <p>Connected Account: {userAddress}</p>}
      <input type="file" onChange={handleFileChange} />
      <input name="title" placeholder="Title" onChange={handleMetadataChange} />
      <input name="description" placeholder="Description" onChange={handleMetadataChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default App;
