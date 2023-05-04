// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Script.sol";
import {MyNFT} from "../src/MyNFT.sol";
import {MyToken} from "../src/MyToken.sol";



contract DeployScript is Script {
    MyNFT myNFT;
    MyToken myToken;
    function setUp() public {}

    function run() public {
        vm.broadcast();
        myNFT = new MyNFT();
        myToken = new MyToken(address(myNFT));
        console.log("MyToken address: ", address(myToken));
        console.log("MyNFT address: ", address(myNFT));

    }
}
