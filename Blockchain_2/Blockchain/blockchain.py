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
    def __init__(self) 
        # create the chain
        self.chain = []
        self.create_block(
            proof = 1, 
            previous_has='0'
        )