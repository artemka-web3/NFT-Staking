// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../lib/forge-std/src/Test.sol";
import "../src/MyNFT.sol";

contract MyNFTTest is Test {
    MyNFT nft;
    address receiver;

    function setUp() public {
        nft = new MyNFT();
    }

    function testSafeMint() public {
        receiver = address(new ERC721ReceiverMock());
        vm.startPrank(receiver);
        nft.safeMint(receiver);
        assertTrue(nft.ownerOf(1) == receiver, "Token not owned by receiver");
    }

    function testGetTokenIdByOwner() public {
        receiver = address(new ERC721ReceiverMock());
        vm.startPrank(receiver);
        nft.safeMint(receiver);
        uint id = nft.getTokenIdByOwner(receiver);
        assertTrue(id == 1, "invalid id");  
        console.log(receiver);  

        console.log("NFT ID", id);  
    }
}

contract ERC721ReceiverMock {
    bytes4 constant ERC721_RECEIVED = 0x150b7a02;

    function onERC721Received(address, address, uint256, bytes memory) public pure returns(bytes4) {
        return ERC721_RECEIVED;
    }
}