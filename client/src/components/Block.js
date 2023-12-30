// this file is for the Block component

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';

class Block extends Component {
    state = { displayTransaction: false };
    // this is for the display button
    toggleTransaction = () => {
        this.setState({ displayTransaction: !this.state.displayTransaction });
    }

    get displayTransaction() {
        // take data from http://localhost:2000/api/transact
        const { data } = this.props.block;

        // convert data to string
        const stringifiedData = JSON.stringify(data);

        // if the data is too long, display only the first 35 characters
        const dataDisplay = stringifiedData.length > 35 ?
            `${stringifiedData.substring(0, 35)}...` :
            stringifiedData;

        // this is for the show less button
        if (this.state.displayTransaction) {
            return (
                <div>
                    {
                        //This piece of code is used to render a list of Transaction components in React.
                        data.map(transaction => (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        ))
                    }
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
                    bsStyle="danger" 
                    bsSize="small" 
                    onClick={this.toggleTransaction}
                >
                    Show More
                </Button>
            </div>
        );
    }

    render() {
        const { timestamp, hash } = this.props.block;
        const hashDisplay = `${hash.substring(0, 15)}...`;
    
        return (
            <div className='Block'>
                <div>Hash: {hashDisplay}</div>
                <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
                {this.displayTransaction}
            </div>
        )
    }
}

export default Block;