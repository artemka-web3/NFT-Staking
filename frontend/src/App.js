import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { Contract, providers, utils, Signer } from "ethers";

const MyNFT_ABI = require('./abis/MyNFT.json').abi;
const MyToken_ABI = require('./abis/MyToken.json').abi;


function App() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [userTokenId, setUserTokenId] = useState("");
  const [reward, setReward] = useState(0);
  const [IsStaked, setIsStaked] = useState(false);



  const MyNFT_ADDRESS = "0xa733776d506a6bc437aec17c809e165e29ca6c75";
  const MyToken_ADDRESS = "0x862ef6ef6c3cf1a7c0cd978f10c5135cbe75bb73";
  let nft_contract;
  let token_contract;

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const connectedAddress = await signer.getAddress();
        nft_contract = new Contract(MyNFT_ADDRESS, MyNFT_ABI, signer);
        token_contract = new Contract(MyToken_ADDRESS, MyToken_ABI, signer)
        setAccount(connectedAddress);
        setConnected(true);
        console.log(account);
        console.log(connected);
        const id = await nft_contract.getTokenIdByOwner(signer.getAddress());
        console.log('users token id:', parseInt(id.toString()));
        setUserTokenId(parseInt(id.toString()))
        if(parseInt(id.toString()) != 0) {
          const rewardAm = await token_contract.calculateTokens(parseInt(id.toString()));
          setReward(rewardAm.toString());
        }
        
      } else {
        console.error("No web3 provider found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mint = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // mint nft 
    const tx = await nft_contract.safeMint(signer.getAddress());
    await tx.wait()
    console.log(await nft_contract.totalSupply());
    // get tokenId of new nft 
    // approve marketplace to spend nft
    // add nft to marketplace
  }

  

  const stake = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    if(userTokenId != "0"){
      const tokenId = await nft_contract.getTokenIdByOwner(signer.getAddress());
      const tx = await token_contract.stake(tokenId.toNumber());
      await tx.wait();
      setIsStaked(true);
    }
  }

  const unstake = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    if(userTokenId != "0"){
      const tokenId = await nft_contract.getTokenIdByOwner(signer.getAddress());
      const tx = await token_contract.unstake(tokenId.toNumber());
      await tx.wait();
      setIsStaked(false);
    }

  }

  const rewardAmount = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    if(userTokenId != "0"){
      const tokenId = await nft_contract.getTokenIdByOwner(signer.getAddress());
      let tokenIdString = tokenId.toString()
      const rewardAm = await token_contract.calculateTokens(parseInt(tokenIdString)-1);
      setReward(rewardAm.toString());
    }
  }

  useEffect(()=>{
    connectWallet();
  })


  return (
    <div>
      <div className="App d-flex align-items-center justify-content-center text-center vh-100">
        <div className="d-grid gap-2 col-6 mx-auto">
          <h1 className="">Reward: {reward}</h1>
          <h2 className="">{userTokenId == "0" ?  "You don't have NFT. Mint one!" : `Your tokenID is ${userTokenId}`}</h2>
          <button onClick={mint} className="btn btn-primary" disabled={userTokenId == "0" ? false : true} type="button">Mint</button>
          <button onClick={stake} className="btn btn-success" disabled={IsStaked == false && userTokenId != "0" ? false : true} type="button">Stake</button>
          <button onClick={unstake} className="btn btn-danger" disabled={IsStaked == true && userTokenId != "0" ? false : true} type="button">Unstake</button>
        </div>
      </div>
    </div>
  );
}

export default App;
