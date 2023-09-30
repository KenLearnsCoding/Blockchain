// const crypto = require('crypto');
// const { json } = require('express');


// const cryptoHash = (...inputs) => {
//     const hash = crypto.createHash('sha256');

//     hash.update(inputs.map( input => JSON.stringify(input)).sort().join(' '));

  

//     return hash.digest('hex');
// };

// module.exports = cryptoHash;

const crypto = require('crypto');

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');

  hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' '));

    //the digest is a term in cryptography to represent the result of a hash.

  return hash.digest('hex');
};

module.exports = cryptoHash;