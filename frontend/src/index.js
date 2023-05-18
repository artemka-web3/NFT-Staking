import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import logo from './logo.svg';
// import './App.css';
// import React, { useState, useEffect, useRef } from "react";
// import { Contract, providers, utils, Signer } from "ethers";

// const MyNFT_ABI = require('./abis/MyNFT.json').abi;
// const MyToken_ABI = require('./abis/MyToken.json').abi;


// function App() {
//   const [connected, setConnected] = useState(false);
//   const [account, setAccount] = useState(null);
//   const [reward, setReward] = useState(0);
//   const [userTokenId, setUserTokenId] = useState(0);
//   const [isStaked, setIsStaked] = useState(0);






//   const MyNFT_ADDRESS = "0x86044f12376f9290214e5451d13dec4885f1fc82";
//   const MyToken_ADDRESS = "0x7cbd9b214bbd269d7439491e5faf3a21ceb25508";
//   let nft_contract;
//   let token_contract;
  
  

//   const connectWallet = async () => {
//     try {
//       if (window.ethereum) {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const provider = new providers.Web3Provider(window.ethereum);
//         const signer = await provider.getSigner();
//         const connectedAddress = await signer.getAddress();
//         nft_contract = new Contract(MyNFT_ADDRESS, MyNFT_ABI, signer);
//         token_contract = new Contract(MyToken_ADDRESS, MyToken_ABI, signer)
//         setAccount(signer.getAddress());
//         setConnected(true);
//         const id = await nft_contract.getTokenIdByOwner(signer.getAddress());
//         if(parseInt(id.toString()) != 0 && token_contract.isStaked(parseInt(nft_contract.getTokenIdByOwner(signer.getAddress()).toString()))) {
//           const rewardAm = await token_contract.calculateTokens(parseInt(id.toString()));
//           setReward(rewardAm.toString());
//         }
        

        
//       } else {
//         console.error("No web3 provider found");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const mint = async () => {
//     const provider = new providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     // mint nft 
//     try{
//       const tx = await nft_contract.safeMint(signer.getAddress());
//       await tx.wait()
//       console.log(await nft_contract.totalSupply());
//     } catch(err){
//       alert(err);
//       console.log(err);

//     }
//     // get tokenId of new nft 
//     // approve marketplace to spend nft
//     // add nft to marketplace
//   }

  

  // const stake = async () => {
  //   const provider = new providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const id = await nft_contract.getTokenIdByOwner(signer.getAddress());

  //   if(parseInt(id.toString()) != 0){
  //     const isApproved = await nft_contract.isApprovedForAll(signer.getAddress(), token_contract.address);
  //     if(parseInt(id.toString()) != 0 && isApproved == false){
  //       const appr_tx = await nft_contract.setApprovalForAll(token_contract.address, true);
  //       await appr_tx.wait();
  //     }
  //     try{
  //       const tx = await token_contract.stake(parseInt(id.toString()));
  //       await tx.wait();
  //     } catch(err){
  //       alert(err);
  //       console.log(err);
  //     }

  //   }
  // }

  // const unstake = async () => {
  //   const provider = new providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   try{
  //     if(parseInt(nft_contract.getTokenIdByOwner(signer.getAddress()).toString()) != 0){
  //       const id = await nft_contract.getTokenIdByOwner(signer.getAddress());
  //       const tx = await token_contract.unstake(parseInt(id.toString()));
  //       await tx.wait();
  //     }
  //   } catch(err){
  //     alert(err);
  //     console.log(err);
  //   }

  // }

//   // const rewardAmount = async () => {
//   //   const provider = new providers.Web3Provider(window.ethereum);
//   //   const signer = provider.getSigner();
//   //   if(userTokenId != 0){
//   //     const tokenId = await nft_contract.getTokenIdByOwner(signer.getAddress());
//   //     let tokenIdString = tokenId.toString()
//   //     const rewardAm = await token_contract.calculateTokens(parseInt(tokenIdString));
//   //     setReward(rewardAm.toString());
//   //   }
//   // }

//   useEffect(()=>{
//     connectWallet();
//   })


//   return (
//     <div>
//       <div className="App d-flex align-items-center justify-content-center text-center vh-100">
//         <div className="d-grid gap-2 col-6 mx-auto">
//           <h1 className="">Reward: {reward}</h1>
//           <h2 className="">Mint NFT if you don't have one!</h2>
//           <button onClick={mint} className="btn btn-primary" type="button">Mint</button>
//           <button onClick={stake} className="btn btn-success" type="button">Stake</button>
//           <button onClick={unstake} className="btn btn-danger"  type="button">Unstake</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
