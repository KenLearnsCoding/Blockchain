const MINE_RATE = 1000;
const  INITIAL_DIFFICULTY = 3;



// This config will serve as a place where we store hard coded and global values
const GENESIS_DATA ={
    timestamp: 1, 
    lastHash: '-----',
    hash: 'has-one',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

const STARTING_BALANCE = 1000;

module.exports= {GENESIS_DATA, MINE_RATE, STARTING_BALANCE};