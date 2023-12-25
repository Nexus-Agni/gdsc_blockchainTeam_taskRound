// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC721 is ERC721, Ownable {
    uint256 private _tokenCounter;

    constructor(
        address initialOwner
    ) ERC721("MyERC721", "M721") Ownable(initialOwner) {
        _tokenCounter = 0;
    }

    function mint(address to) public onlyOwner {
        _mint(to, _tokenCounter);
        _tokenCounter++;
    }

    function balanceOf(
        address owner
    ) public view override returns (uint256 balance) {
        return super.balanceOf(owner);
    }

    function ownerOf(
        uint256 tokenId
    ) public view override returns (address owner) {
        return super.ownerOf(tokenId);
    }

    function approve(address to, uint256 tokenId) public override {
        super.approve(to, tokenId);
    }

    function getApproved(
        uint256 tokenId
    ) public view override returns (address operator) {
        return super.getApproved(tokenId);
    }

    function setApprovalForAll(
        address operator,
        bool approved
    ) public override {
        super.setApprovalForAll(operator, approved);
    }

    function isApprovedForAll(
        address owner,
        address operator
    ) public view override returns (bool) {
        return super.isApprovedForAll(owner, operator);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        super.transferFrom(from, to, tokenId);
    }
}
