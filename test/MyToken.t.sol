// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../src/MyToken.sol";
import "../src/MyNFT.sol";
import "../lib/forge-std/src/Test.sol";


contract MyTokenTest is Test {
    MyNFT public my_nft;
    MyToken public my_token;
    address public receiver;

    function setUp() public {
        my_nft = new MyNFT();
        my_token = new MyToken(address(my_nft));
        receiver = address(new ERC721ReceiverMock());
    }

    function testStake() public {
        uint256 tokenId = 1;
        vm.prank(receiver);
        my_nft.safeMint(receiver);

        vm.prank(receiver);
        my_nft.approve(address(my_token), tokenId);

        vm.prank(receiver);
        my_token.stake(tokenId);
        // Check that the token with tokenId is owned by the account that minted the token
        assertTrue(my_token.tokenOwnerOf(tokenId) == address(receiver), "Incorrect token owner after staking");
        // Check that the token with tokenId was staked at the current block timestamp
        assertTrue(my_token.tokenStakedAt(tokenId) == block.timestamp, "Incorrect stake time");
    }

function testUnstake() public {
    uint256 tokenId = 1;
    vm.prank(receiver);
    my_nft.safeMint(receiver);

    vm.prank(receiver);
    my_nft.approve(address(my_token), tokenId);

    vm.prank(receiver);
    my_token.stake(tokenId);


    // Record the balance of the account that minted the token before it is unstaked
    uint256 balanceBeforeUnstake = my_token.balanceOf(receiver);
    // Calculate the amount of MyToken earned from staking the token with tokenId
    uint256 tokensEarned = my_token.calculateTokens(tokenId);

    // Unstake the token with tokenId
    vm.prank(receiver);
    my_token.unstake(tokenId);

    // Check that the account that minted the token has the correct balance of MyToken after unstaking
    assertTrue(my_token.balanceOf(receiver) == balanceBeforeUnstake + tokensEarned, "Incorrect balance after unstaking");
    // Check that the token with tokenId is not owned by any account after unstaking
    assertTrue(my_token.tokenOwnerOf(tokenId) == address(0), "Incorrect token owner after unstaking");
    // Check that the stake time of the token with tokenId is reset to zero after unstaking
    assertTrue(my_token.tokenStakedAt(tokenId) == 0, "Incorrect stake time after unstaking");
    // Check that the token with tokenId is returned to the account that minted the token after unstaking
    assertTrue(my_nft.ownerOf(tokenId) == receiver, "Token not returned to owner after unstaking");
}

}


contract ERC721ReceiverMock {
    bytes4 constant ERC721_RECEIVED = 0x150b7a02;

    function onERC721Received(address, address, uint256, bytes memory) public pure returns(bytes4) {
        return ERC721_RECEIVED;
    }
}