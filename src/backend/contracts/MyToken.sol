// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20('My Token', 'HDH') {
        _mint(address(this), 10000 * 10 ** 18);
        _transfer(address(this), 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199, 10000000000000000000000);
    }
}