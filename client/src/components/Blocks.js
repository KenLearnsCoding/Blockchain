import React,  { Component } from 'react';

// this blocks component will make a request to the  
// blocks endpoint of the backend, which will return data of te blocks
class Blocks extends Component {
    state = { blocks: []};

    componentDidMount() {
        fetch('http://localhost:2000/api/blocks')
            .then(response  => response.json())
            .then(json => this.setState({ blocks: json }));
    }

    render() {
        console.log('this.state', this.state);
    
        return (
            <div>
                <h3>Blocks</h3>
                {this.state.blocks.map((block, index) => (
                    <div key={index}>
                        <p>Block data: {JSON.stringify(block)}</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default Blocks;