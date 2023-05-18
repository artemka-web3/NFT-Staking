import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { Contract, providers, utils, Signer } from "ethers";

const MyNFT_ABI = require('./abis/MyNFT.json').abi;
const MyToken_ABI = require('./abis/MyToken.json').abi;


function App() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [userTokenId, setUserTokenId] = useState(0);
  const [reward, setReward] = useState(0);
  const [IsStaked, setIsStaked] = useState(false);



  const MyNFT_ADDRESS = "0x0c6AC6Dab04ce939cFA40695CBA5E33D59426aBf";
  const MyToken_ADDRESS = "0xcec36975693B1028Ee6A25c277bD98c5Ad4eD713";
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
        const stakedId = await token_contract.getIdStakedByUser(signer.getAddress());
        const isStakedHZ = await token_contract.isStaked(parseInt(stakedId.toString()));
        if(parseInt(id.toString()) != 0 && isStakedHZ == false){
          console.log('users token id:', parseInt(id.toString()));
          setUserTokenId(parseInt(id.toString()))
          setIsStaked(false);
        } else if(isStakedHZ == true){
            const stakedId = await token_contract.getIdStakedByUser(signer.getAddress());
            setUserTokenId(parseInt(stakedId.toString()))
            const rewardAm = await token_contract.calculateTokens(parseInt(stakedId.toString()));
            setReward(rewardAm.toString());
            setIsStaked(true);

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
    const id = await nft_contract.getTokenIdByOwner(signer.getAddress());

    if(parseInt(id.toString()) != 0){
      const isApproved = await nft_contract.isApprovedForAll(signer.getAddress(), token_contract.address);
      if(parseInt(id.toString()) != 0 && isApproved == false){
        const appr_tx = await nft_contract.setApprovalForAll(token_contract.address, true);
        await appr_tx.wait();
      }
      try{
        const tx = await token_contract.stake(parseInt(id.toString()));
        await tx.wait();
      } catch(err){
        alert(err);
        console.log(err);
      }

    }
  }

  const unstake = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const id = await nft_contract.getTokenIdByOwner(signer.getAddress());
    const stakedId = await token_contract.getIdStakedByUser(signer.getAddress());

    try{
      if(parseInt(id.toString()) != 0){
        const id = await nft_contract.getTokenIdByOwner(signer.getAddress());
        console.log("ID", parseInt(id.toString()))
        const tx = await token_contract.unstake(parseInt(id.toString()));
        await tx.wait();
      } else if(parseInt(stakedId.toString()) != 0){
          const stakedId = await token_contract.getIdStakedByUser(signer.getAddress());
          console.log("StakedID", parseInt(stakedId.toString()))
          const tx = await token_contract.unstake(parseInt(stakedId.toString()));
          await tx.wait();
      }
    } catch(err){
      alert(err);
      console.log(err);
    }

  }

  // const rewardAmount = async () => {
  //   const provider = new providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   if(userTokenId != 0){
  //     const tokenId = await nft_contract.getTokenIdByOwner(signer.getAddress());
  //     let tokenIdString = tokenId.toString()
  //     const rewardAm = await token_contract.calculateTokens(parseInt(tokenIdString));
  //     setReward(rewardAm.toString());
  //   }
  // }

  useEffect(()=>{
    connectWallet();
  })


  return (
    <div>
      <div className="App d-flex align-items-center justify-content-center text-center vh-100">
        <div className="d-grid gap-2 col-6 mx-auto">
          <h1 className="">Reward: {reward}</h1>
          <h2 className="">{userTokenId == 0 ?  "You don't have NFT. Mint one!" : `Your tokenID is ${userTokenId}`}</h2>
          <button onClick={mint} className="btn btn-primary" disabled={userTokenId == 0 ? false : true} type="button">Mint</button>
          <button onClick={stake} className="btn btn-success" disabled={IsStaked == false && userTokenId != "0" ? false : true} type="button">Stake</button>
          <button onClick={unstake} className="btn btn-danger" disabled={IsStaked == true && userTokenId != "0" ? false : true} type="button">Unstake</button>
        </div>
      </div>
    </div>
  );
}

export default App;