// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

contract MyToken is ERC20, ERC721Holder, Ownable {
    IERC721 public nft;
    mapping(uint256 => address) public tokenOwnerOf;
    mapping(address => uint256) public idStakedByUser;

    mapping(uint256 => uint256) public tokenStakedAt;
    uint256 public EMISSION_RATE = (50 * 10 ** decimals()) / 1 days;
    mapping (uint256 => bool) public isStaked;


    constructor(address _nft) ERC20("MyToken", "MTK") {
        nft = IERC721(_nft);
    }

    function stake(uint256 tokenId) external {
        nft.safeTransferFrom(msg.sender, address(this), tokenId);
        tokenOwnerOf[tokenId] = msg.sender;
        tokenStakedAt[tokenId] = block.timestamp;
        idStakedByUser[msg.sender] = tokenId;
        isStaked[tokenId] = true;
    }

    function calculateTokens(uint256 tokenId) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - tokenStakedAt[tokenId];
        return timeElapsed * EMISSION_RATE;
        // переделать в view функцию
    }

    function getIdStakedByUser(address user) public view returns(uint256){
        return idStakedByUser[user];
    }
    function unstake(uint256 tokenId) external {
        require(tokenOwnerOf[tokenId] == msg.sender, "You can't unstake");
        _mint(msg.sender, calculateTokens(tokenId)); // Minting the tokens for staking
        nft.transferFrom(address(this), msg.sender, tokenId);
        delete tokenOwnerOf[tokenId];
        delete tokenStakedAt[tokenId];
        isStaked[tokenId] = false;
    }

    function checkIfStaked(uint256 tokenId) public view returns(bool) {
        return isStaked[tokenId];
    }                                                                                                                                                                                                                                                                           
}