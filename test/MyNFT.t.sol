// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../lib/forge-std/src/Test.sol";
import "../src/MyNFT.sol";

contract MyNFTTest is Test {
    MyNFT nft;
    address receiver;

    function setUp() public {
        nft = new MyNFT();
        receiver = address(new ERC721ReceiverMock());
    }

    function testSafeMint() public {
        nft.safeMint(receiver);
        assertTrue(nft.ownerOf(1) == receiver, "Token not owned by receiver");
    }

    function testGetTokenIdByOwner() public {
        nft.safeMint(receiver);
        uint id = nft.getTokenIdByOwner(receiver);
        assertTrue(id == 1, "invalid id");  
        console.log("NFT ID", id);  
    }
}

contract ERC721ReceiverMock {
    bytes4 constant ERC721_RECEIVED = 0x150b7a02;

    function onERC721Received(address, address, uint256, bytes memory) public pure returns(bytes4) {
        return ERC721_RECEIVED;
    }
}