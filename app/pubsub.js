const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION',
};

class PubSub {
  constructor({ blockchain, transactionPool }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;

    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();
    // this.subscriber.connect();
    // this.publisher.connect();

    this.subscribeToChannels();
    this.publisher.on('connect', () => {
      console.log('Publisher connected to Redis');
    });
    
    this.subscriber.on('connect', () => {
      console.log('Subscriber connected to Redis');
    });
    

    this.subscriber.on(
      'message',
      (channel, message) => this.handleMessage(channel, message)
    );

    this.subscriber.on('error', (error) => {
      console.error('Subscriber error:', error);
    });

    this.publisher.on('error', (error) => {
      console.error('Publisher error:', error);
    });
  }

  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}`);

    const parsedMessage = JSON.parse(message);

    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage);
        break;
      case CHANNELS.TRANSACTION:
        this.transactionPool.setTransaction(parsedMessage);
        break;
      default:
        return;
    }
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, (err) => {
        this.subscriber.subscribe(channel);
      });
    });
  }
 
  

  broadcastChain() {
    console.log('Broadcasting blockchain. Chain:', this.blockchain.chain);
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });

  }
}


module.exports = PubSub;

