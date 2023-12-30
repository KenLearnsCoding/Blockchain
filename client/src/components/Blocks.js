import React, { Component } from 'react';
import Block from './Block';

// this blocks component will make a request to the  
// blocks endpoint of the backend, which will return data of te blocks
class Blocks extends Component {
    state = { blocks: [] };

    // fetch data from http://localhost:2000/api/blocks
    componentDidMount() {
        fetch('http://localhost:2000/api/blocks')
            .then(response => response.json())
            .then(json => this.setState({ blocks: json }));
    }

    render() {
        console.log('this.state', this.state);
    
        return (
            <div>
                <h3>Blocks</h3>
                { 
                    this.state.blocks.map(block => {
                        return (
                            <Block key={block.hash} block={block} />
                        )
                    })
                }
            </div>
        );
    } 
}

export default Blocks;