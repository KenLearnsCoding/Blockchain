                HOW TO RUN THE PROGRAM

# Step 1: Run the files
- To run the program, U have to run 3 hadcoin_node...py files separately on the terminal. 

# Step 2: Get the chain
- Open the postman software 
- Use these url in order to get the genesis block(first block) -> press enter:
    GET:    http://127.0.0.1:5002/get_chain 
    GET:    http://127.0.0.1:5003/get_chain
    GET:    http://127.0.0.1:5004/get_chain

# Step 3: Connect all the node together:
- Chose the raw feature of the body, Json format 
- copy the url set in the nodes.json 
- Paste the url set to the raw box, but have to remove to the url that has the same port to the current using port:
    EX: 
    POST:   http://127.0.0.1:5002/connect_node
    {
        "nodes": [
            "http://127.0.0.1:5003",
            "http://127.0.0.1:5004"
        ]
    }
- Press enter, then repeat to other url as well. 

# Step 4: Check the chain valid or not
- Use
    POST: http://127.0.0.1:5002/is_valid
    POST: http://127.0.0.1:5003/is_valid
    POST: http://127.0.0.1:5004/is_valid
- Get this result:
    'message': 'All good. The Blockchain is valid.'
    Or
    'message': 'Houston, we have a problem. The Blockchain is not valid.'

# step 5: Make transaction.
- Copy and paste transaction.json file to the raw box of body feature
- Use 
    POST: http://127.0.0.1:5002/add_transaction

# step 6: Mine block to get the block chain
- use 
    GET: http://127.0.0.1:5002/mine_block

# step 6: get update to other nodes
- use 
    GET: http://127.0.0.1:5003/replace_chain
    GET: http://127.0.0.1:5004/replace_chain


# whenever you add transaction, you have to use the url replace_chain to get the chain update, then use the url has get_chain to see full chain of blockchain. 