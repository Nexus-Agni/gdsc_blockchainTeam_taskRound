const MyERC721 = artifacts.require("MyERC721");

contract("MyERC721", accounts => {
    let instance;
    const owner = accounts[0];
    const recipient = accounts[1];

    beforeEach(async () => {
        instance = await MyERC721.new(owner);
    });

    it("should mint a new token", async () => {
        await instance.mint(recipient, { from: owner });
        const balance = await instance.balanceOf(recipient);
        assert.equal(balance.toNumber(), 1, "balance should be 1");
    });

    it("should fail when non-owner tries to mint a token", async () => {
        try {
            await instance.mint(recipient, { from: recipient });
            assert.fail("Expected revert not received");
        } catch (error) {
            assert(error.message.includes('revert'), "Expected revert");
        }
    });

    it("should return correct balances after transfer", async () => {
        await instance.mint(owner, { from: owner });
        await instance.transferFrom(owner, recipient, 0, { from: owner });
        const balanceOwner = await instance.balanceOf(owner);
        const balanceRecipient = await instance.balanceOf(recipient);
        assert.equal(balanceOwner.toNumber(), 0, "balance should be 0");
        assert.equal(balanceRecipient.toNumber(), 1, "balance should be 1");
    });

    it("should approve and get approved address", async () => {
        await instance.mint(owner, { from: owner });
        await instance.approve(recipient, 0, { from: owner });
        const approved = await instance.getApproved(0);
        assert.equal(approved, recipient, "approved address is not correct");
    });

    it("should set and check approval for all", async () => {
        await instance.setApprovalForAll(recipient, true, { from: owner });
        const isApproved = await instance.isApprovedForAll(owner, recipient);
        assert.equal(isApproved, true, "approval is not correct");
    });
});