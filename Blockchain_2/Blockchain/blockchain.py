# create a Blockchain. 
# A blockchain is a chain of blocks that contain data or information.

# To be installed: pip install Flask
# Download Postman to test the API
# Importing the libraries
import datetime # to get the current time
import hashlib # to hash the blocks
import json # to encode the blocks before hashing
from flask import Flask, jsonify # to create the web app

# Part 1 - Building a Blockchain.  
class Blockchain: 
    # this init like a constructor
    # Self is the object that we are going to create
    def __init__(self):
        # create a chain
        self.chain = []
        # create the block
        self.create_block(
            proof = 1, 
            previous_hash='0'
        )
        
    def create_block(self, proof, previous_hash):
        #create the block with its properties
        block= {
            'index': len(self.chain) + 1, 
            'timestamp': str(datetime.datetime.now()),# get the timestamp
            'proof': proof, # pass proof of work here  from postman
            'previous_hash': previous_hash, # pass the previous hash from postman
        }
        # append the block to the chain
        self.chain.append(block)
        
        # return the block to where the create_block function is called
        return block

    # get the previous block in the chain
    def get_previous_block(self):
        # get the last block in the chain
        return self.chain[-1]
    
    # proof of work
    def proof_of_work(self, previous_proof):
        new_proof = 1 # start with 1
        check_proof = False # check if the proof is valid
        while check_proof is False: 
            # create a hash operation
            hash_operation = hashlib.sha256(str(new_proof**2 - previous_proof**2).encode()).hexdigest()
            
            # check if the first 4 characters of the hash are 0000
            if hash_operation[:4] == '0000':
                check_proof = True
            else: 
                new_proof += 1
        
        return new_proof
    
    def hash(self, block):
        # encode the block before hashing  into the right format
        encode_block = json.dumps(block, sort_keys = True).encode()
        
        # return the hash of the block
        return hashlib.sha256(encode_block).hexdigest()
    
    # check the chain is valid or not
    def is_chain_valid(self, chain):
        # start checking the first block in the chain
        previous_block = chain[0]
        
        # each block has a number of block
        block_index = 1
        
        # loop through the chain
        while block_index < len(chain):  #check the first block in the chain till the last block
            
            #get the current block
            block = chain[block_index]
            
            # check if the previous hash of the current block is equal to the hash of the previous block
            if block['previous_hash'] != self.hash(previous_block):
                return False
            
            # check if the proof of the previous block is valid
            previous_proof = previous_block['proof']
            
            # get the proof of the current block
            proof = block['proof']
            
            # create a hash operation to check if the proof is valid with the previous proof or not
            hash_operation = hashlib.sha256(str(proof**2 - previous_proof**2).encode()).hexdigest()
            
            # check the first 4 characters of the hash are 0000 or not
            if hash_operation[:4] != '0000':
                return False
            
            # save the current block as the previous block for the next loop
            previous_block = block
            
            # update the block index
            block_index += 1
            
        return True
            
# Part 2 - Mining our Blockchain
# creating a web app
app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

# Creating a Blockchain
blockchain = Blockchain()

# Mining a new block
@app.route('/mine_block', methods = ['GET']) # define the route

# creating the mine_block function
def mine_block():
    # assign the previous block to the previous_block variable
    previous_block = blockchain.get_previous_block()
    
    # assign the previous proof to the previous_proof variable
    previous_proof = previous_block['proof']
    
    # assign the proof of the current block to the proof variable
    proof = blockchain.proof_of_work(previous_proof)
    
    # assign the previous hash to the previous_hash variable
    previous_hash = blockchain.hash(previous_block)
    
    # assign the current block to the block variable
    block = blockchain.create_block(proof, previous_hash)
    
    # create a response to return to the user
    response = {
        'message': 'Congratulation! you just mined a block!',
        'index': block['index'], 
        'timestamp': block['timestamp'],
        'proof': block['proof'],
        'previous_hash': block['previous_hash']
    }
    
    return jsonify(response), 200 # return the response to the user

# Getting the full Blockchain
@app.route('/get_chain', methods = ['GET'])

# creating the get_chain function to get the full chain
def get_chain():
    # create a response to return to the user
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain)
    }
    
    return jsonify(response), 200

# Getting the full Blockchain
@app.route('/is_valid', methods = ['GET'])

# creating the is_valid function to check if the chain is valid or not
def is_valid():
    # get the chain and assign it to the chain variable
    is_valid = blockchain.is_chain_valid(blockchain.chain)
    
    # check if the chain is valid or not and return the response to the user
    if is_valid: 
        response = {
            'message': 'All good. The Blockchain is valid.'
        }
    else: 
        response = {
            'message': 'Houston, we have a problem. The Blockchain is not valid.'
        }
    
    return jsonify(response), 200




# Running the app
app.run(host = '0.0.0.0', port = 5001)

