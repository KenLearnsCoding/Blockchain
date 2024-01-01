import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';
import history from '../history';

// this will poll the transaction pool map every 10 seconds
const POLL_INTERVAL_MS = 10000;

class TransactionPool extends Component {
    state = { transactionPoolMap: {} };

    // fetch data from http://localhost:2000/api/blocks with function
    fetchTransactionPoolMap = () => {
        // ${document.location.origin} will turn the url to the localhost:2000 always
        fetch(`${document.location.origin}/api/transaction-pool-map`)
            .then(response => response.json())
            .then(json => this.setState({ transactionPoolMap: json }));
    }

    fetchMineTransaction = () => {
        fetch(`${document.location.origin}/api/mine-transactions`)
            .then(response => {
                if (response.status === 200 ) {
                    alert('success');
                    history.push('/blocks');
                } else {
                    alert('The mine-transactions block request did not complete.');
                }
            })
    }

    // call the fetchTransactionPoolMap function
    componentDidMount() {
        this.fetchTransactionPoolMap();

        // this will call the fetchTransactionPoolMap function every 10 seconds
        this.fetchPoolMapInterval = setInterval(
            () => this.fetchTransactionPoolMap(),
            POLL_INTERVAL_MS
        );
    }   

    componentWillUnmount() {
        // clear the interval
        clearInterval(this.fetchPoolMapInterval);
    }


    render() {
        return (
            // this will call the fetchTransactionPoolMap function
            <div className='TransactionPool'>
                <div><Link to='/'>Home</Link></div>
                <h3>Transaction Pool</h3>
                {
                    // this will loop through the transactionPoolMap and display the transaction from the fetch above
                    Object.values(this.state.transactionPoolMap).map(transaction => {
                        return (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        )
                    })
                }
                <hr />
                <Button
                 bsStyle="danger"
                 onClick={this.fetchMineTransaction}
                >
                    Mine the transactions
                </Button>

            </div>
        );
    }
}

export default TransactionPool;