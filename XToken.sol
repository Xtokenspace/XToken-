// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title XToken
 * @dev Custom ERC20 token with a burn function and Ownable functionality.
 */
contract XToken is ERC20, Ownable {
    uint256 private constant TOTAL_SUPPLY = 1_000_000_000_000 * 10 ** 18; // 1 Trillion Tokens

    /**
     * @dev Constructor that mints the entire token supply to the initial owner.
     * @param initialOwner The address that will own all tokens initially.
     */
    constructor(address initialOwner) ERC20("X Token", "X") Ownable(initialOwner) {
        _mint(initialOwner, TOTAL_SUPPLY); // Mint all tokens to the contract creator
    }

    /**
     * @dev Function to burn tokens from the sender's balance.
     * @param amount The number of tokens to burn.
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
