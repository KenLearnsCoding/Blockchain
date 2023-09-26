const crypto = require('crypto');


const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');

    hash.update(inputs.sort().join(' '));

    //the digest is a term in cryptography to represent the result of a hash.

    return hash.digest('hex');
};

module.exports = cryptoHash;