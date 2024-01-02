import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';


class ConductTransaction extends Component {
    state = { recipient: '', amount: 0 };

    // this contains information about what the user typed into the input
    updateRecipient = event => {
        this.setState({ recipient: event.target.value });
    }
     
    // this contains information about what the user typed into the input
    updateAmount = event => {
        this.setState({ amount: Number(event.target.value) });
    }

    // call the api to send the transaction
    conductTransaction = () => {
        const { recipient, amount } = this.state;
        // ${document.location.origin} will turn whatever url is to the localhost:2000 always
        fetch(`${document.location.origin}/api/transact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipient, amount })
        }).then(response => response.json())
          .then(json => {
            alert(json.message || json.type);
            history.push('/transaction-pool');
          });
    }

    render() {
        return (
            <div className='ConductTransaction'>
                <Link to='/'>Home</Link>
                <h3>Conduct a Transaction</h3>
                <FormGroup>
                    <FormControl
                        input='text'
                        placeholder='recipient'
                        value={this.state.recipient}
                        onChange={this.updateRecipient}
                    />
                </FormGroup>

                <FormGroup>
                    <FormControl
                        input='number'
                        placeholder='amount'
                        value={this.state.amount}
                        onChange={this.updateAmount}
                    />
                </FormGroup>

                {/* creat button in the react component */}
                <div>
                    <Button 
                        bsStyle="danger"
                        onClick={this.conductTransaction}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        )
    } 
}

export default ConductTransaction;