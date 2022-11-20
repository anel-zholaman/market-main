// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Marketplace {

    // Variables
    uint public itemCount; 

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );
    // itemId -> Item
    mapping(uint => Item) public items;

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external {
        require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        // transfer nft
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );
    }

    function purchaseItem(uint _itemId, IERC20 paytoken) external payable {
        Item storage item = items[_itemId];
        // pay seller;
        paytoken.transferFrom(msg.sender, item.seller, item.price);
        // update item to sold
        item.sold = true;
        // transfer nft to buyer
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }
    
    function getTotalPrice(uint _itemId) view public returns(uint){
        return(items[_itemId].price);
    }

     
}