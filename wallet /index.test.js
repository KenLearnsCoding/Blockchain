const Wallet = require('./index');

describe('Wallet', () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it('has a `balance`', () => {
        expect(wallet).toHaveProperty('balance');
    });

    it('has a `publicKey`', () => {
        console.log(wallet.publicKey);

        expect(wallet).toHaveProperty('publicKey');
    });

    describe('singing data', () => {
        const data = 'foobar';

        it('verifies a signature', () => {

        });

        it('does not verify an invalid signature', () => {

        });
    });


});