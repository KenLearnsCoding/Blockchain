// const redis = require('redis');

// const CHANNELS = {
//   TEST: 'TEST',
//   BLOCKCHAIN: 'BLOCKCHAIN',
//   TRANSACTION: 'TRANSACTION'
// };

// class PubSub {
//   constructor({ blockchain, transactionPool }) {
//     this.blockchain = blockchain;
//     this.transactionPool = transactionPool;

//     this.publisher = redis.createClient();
//     this.subscriber = redis.createClient();
//     this.init()
//   }

//   async init() {
//       await this.publisher.connect()
//       await this.subscriber.connect()

//       this.subscribeToChannels();
//   }

//   handleMessage( message, channel) {
//     console.log(`Message received. Channel: ${channel}. Message: ${message}`);

//     const parsedMessage = JSON.parse(message);

//     switch(channel) {
//       case CHANNELS.BLOCKCHAIN:
//         this.blockchain.replaceChain(parsedMessage, true, () => {
//           this.transactionPool.clearBlockchainTransactions({
//              chain: parsedMessage
//           });
//         });
//         break;
//       case CHANNELS.TRANSACTION:
//         this.transactionPool.setTransaction(parsedMessage);
//         break;
//       default:
//         return;
//     }
//   }

//   subscribeToChannels() {
//     Object.values(CHANNELS).forEach(channel => {
//       this.subscriber.subscribe(channel, (message, channel) => {
//         this.handleMessage(message, channel)});
//     });
//   }

//   // publish({ message, channel}) {
//   //   this.subscriber.unsubscribe(channel, () => {
//   //     this.publisher.publish(channel, message, () => {
//   //       this.subscriber.subscribe(channel);
//   //     });
//   //   });
//   // }
//   publish({ channel, message}) {
//     this.publisher.publish(channel, message);
//   }
//   broadcastChain() {
//     this.publish({
//       channel: CHANNELS.BLOCKCHAIN,
//       message: JSON.stringify(this.blockchain.chain)
//     });
//   }

//   broadcastTransaction(transaction) {
//     this.publish({
//       channel: CHANNELS.TRANSACTION,
//       message: JSON.stringify(transaction)
//     })
//   }
// }

// module.exports = PubSub;

const PubNub = require('pubnub');
const { v4: uuidv4 } = require('uuid');

const credentials = {
  publishKey: 'pub-c-2d58d2d3-8f2b-4aef-97a5-d18336bac2d1',
  subscribeKey: 'sub-c-f9430617-4fbc-4f4b-b71a-918dc69043d3',
  secretKey: 'sec-c-NGE1ODRmNjgtY2JmZS00N2YwLWJiMTctOTA2NTE5OWE2YzQy',
  uuid: uuidv4()
};

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'
};

class PubSub {
  constructor({ blockchain, transactionPool }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;

    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}`);

    const parsedMessage = JSON.parse(message);

    switch(channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage, true, () => {
          this.transactionPool.clearBlockchainTransactions({
             chain: parsedMessage
          });
        });
        break;
      case CHANNELS.TRANSACTION:
        this.transactionPool.setTransaction(parsedMessage);
        break;
      default:
        return;
    }
  }


  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        this.handleMessage(channel, message);
      }
    };
  }

  publish({ channel, message}) {
    this.pubnub.publish({ channel, message });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction)
    })
  }
}

module.exports = PubSub;