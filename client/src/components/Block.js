// this file is for the Block component

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Block extends Component {
    state = { displayTransaction: false };
    // this is for the display button
    toggleTransaction = () => {
        this.setState({ displayTransaction: !this.state.displayTransaction });
    }

    get displayTransaction() {
        const { data } = this.props.block;

        const stringifiedData = JSON.stringify(data);

        const dataDisplay = stringifiedData.length > 35 ?
            `${stringifiedData.substring(0, 35)}...`:
            stringifiedData;

        // this is for the show less button
        if (this.state.displayTransaction) {
            return (
                <div>
                    {JSON.stringify(data)}
                    <br />
                    <Button 
                        bsStyle="danger" 
                        bsSize="small" 
                        onClick={this.toggleTransaction}
                    >
                        Show Less
                    </Button>
                </div>
            );
        }
        
        // this is for the show more button
        return (
            <div>
                Data: {dataDisplay}
                <Button 
                    bsStyle ="danger" 
                    bsSize="small" 
                    onClick={this.toggleTransaction}
                >
                    Show More
                </Button>
            </div>
        );
    }

    render() {
        console.log('this.displayTransaction', this.displayTransaction);

        const { timestamp, hash} = this.props.block;

        const hashDisplay = `${hash.substring(0,15)}...`;
    
        return (
            <div className='Block'>
                <div>Hash: {hashDisplay}</div>
                <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
                {this.displayTransaction}
            </div>
        )
    }
};

export default Block;