import axios from 'axios';

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY as string;
const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET_API_KEY as string;

// Function to upload file (anime work) to IPFS via Pinata
export const uploadToIPFS = async (file: File): Promise<string | null> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(url, formData, {
      maxBodyLength: Infinity, // Prevents max size error
      headers: {
        'Content-Type': `multipart/form-data`, // Removed boundary
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });
    
    console.log('File uploaded to IPFS:', response.data);
    return response.data.IpfsHash; // Returns IPFS hash
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    return null;
  }
};

// Function to upload JSON metadata to IPFS via Pinata
export const uploadJSONToIPFS = async (metadata: object): Promise<string | null> => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  try {
    const response = await axios.post(url, metadata, {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });

    console.log('Metadata uploaded to IPFS:', response.data);
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error);
    return null;
  }
};
