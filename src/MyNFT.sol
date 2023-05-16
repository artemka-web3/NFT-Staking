// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public totalSupply;
    constructor() ERC721("MyNFT", "MNFT") {}

    function safeMint(address to) public returns(uint256) {
        totalSupply++;
        require(balanceOf(to) <= 1, "You already have an NFT");
        _safeMint(to, totalSupply);
        return totalSupply; //returns minted tokenId
    }

    function getTokenIdByOwner(address user) public view returns(uint){
        for(uint i=0; i<totalSupply; i++){
            if(ownerOf(i) == user){
                return i;
            } else {
            }
        }
        return 0;

    }



}