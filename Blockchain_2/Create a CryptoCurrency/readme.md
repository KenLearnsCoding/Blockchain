                HOW TO RUN THE PROGRAM

# Step 1:
- To run the program, U have to run 3 hadcoin_node...py files separately on the terminal. 

# Step 2: Get the chain
- Open the postman software 
- Type these url in order to get the genesis block(first block) -> press enter:
    GET:    http://127.0.0.1:5002/get_chain 
    GET:    http://127.0.0.1:5003/get_chain
    GET:    http://127.0.0.1:5004/get_chain

# Step 3: Connect all the node together:
- Chose the raw feature, Json format 
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

# Step 4: 
- 