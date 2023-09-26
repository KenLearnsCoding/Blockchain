const wallet = require('./index');

describe('wallet', () => {
    let wallet;

    beforeEach(() => {
        wallet = new wallet();
    });

    it('has a `balance`',() => {
        expect(wallet).toHaveProperty('balance');
    });

    it('has a `publicKey`', () => {
        expect(wallet).toHaveProperty('publicKey');
    });
});