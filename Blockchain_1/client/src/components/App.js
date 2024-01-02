import React, { Component } from "react";

import logo from '../asset/logo.png'
import { Link } from "react-router-dom";

class App extends Component {
    state = { walletInfo: {}};

    componentDidMount() {
        // ${document.location.origin} will turn whatever url is to the localhost:2000 always
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({ walletInfo: json}));

    }

    render() {
        const { address, balance } = this.state.walletInfo;
        return (
            <div className="App">
                <img className='logo' src={logo}></img>
                <br />
                <div>
                    Welcome to the blockchain...
                </div>
                <br />
                <div><Link to='/blocks'>Blocks</Link></div>
                <div><Link to='/conduct-transaction'>Conduct a Transaction</Link></div>
                <div><Link to='/transaction-pool'>Transaction Pool</Link></div>
                <br />
                <div className='WalletInfo'>
                    <div>Address: {address}</div>
                    <div>Balance: {balance}</div>
                </div>
                <br />
            </div>
        );
    }
}

export default App;