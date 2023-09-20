// const redis = require('redis');

// const CHANNELS = {
//   TEST: 'TEST', 
//   BLOCKCHAIN: 'BLOCKCHAIN'
// };

// class PubSub {
//   constructor(blockchain) {
//     this.blockchain = blockchain;

//     this.publisher = redis.createClient();
//     this.subscriber = redis.createClient();

//     this.subscribeToChannels();

//   }

//   // Changed signature here, not sure what message and channel were doing here?
//   //async init({channel, message}) {
//   async init() {
//     await this.publisher.connect();
//     await this.subscriber.connect();
//   }

//   subscribeToChannels() {
//     Object.values(CHANNELS).forEach(channel => {
//       // Added debug...
//       console.log(`Subscribing to ${channel}`);
//       // Subscribe passing in the subscriber function... using
//       // same function for all channels here.
//       this.subscriber.subscribe(channel, (message, channel) => {
//           console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
    
//           // Do something with this according to your application logic...
//           const parserMessage = JSON.parse(message);
    
//           if (channel === CHANNELS.BLOCKCHAIN) {
//             console.log(`Message was for channel ${CHANNELS.BLOCKCHAIN}`);
//           }
//       });
//     });
//   }

//   publish({ channel, message}){
//     this.publisher.publish(channel, message);
//   }

//   // I didn't use this as I don't know what this.blockchain.chain is.
//   broadcastChain() {
//     this.publish({
//         channel: CHANNELS.BLOCKCHAIN,
//         message: JSON.stringify(this.blockchain.chain)
//     });
//   }
// }

// // Added test code to test this in one file...
// module.exports = PubSub;


// const redis = require('redis');

// const CHANNELS = {
//   TEST: 'TEST', 
//   BLOCKCHAIN: 'BLOCKCHAIN'
// };

// class PubSub {
//   constructor({blockchain}) {
//     this.blockchain = blockchain;

//     this.publisher = redis.createClient();
//     this.subscriber = redis.createClient();

//     this.subscribeToChannels();
//     this.subscriber.on(
//       'message', 
//       (channel, message) => this.handleMessage(channel, message)
//     );

//   }

//   async init() {
//     await this.publisher.connect();
//     await this.subscriber.connect();
//   }


//   handleMessage (channel, message) {
//     console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
    
//     const parserMessage = JSON.parse(message);

//     if (channel === CHANNELS.BLOCKCHAIN) {
//         this.blockchain.replaceChain(parserMessage);
//     }
//   } 

//   subscribeToChannels() {
//     Object.values(CHANNELS).forEach(channel => {
//       this.subscriber.subscribe(channel);
//     });
//   }

//   publish({ channel, message}){
//     this.publisher.publish(channel, message);
//   }

//   broadcastChain() {
//     this.publish({
//         channel: CHANNELS.BLOCKCHAIN,
//         message: JSON.stringify(this.blockchain.chain)
//     });
//   }
// }


// module.exports = PubSub;

// const redis = require('redis');

// const CHANNELS = {
//   TEST: 'TEST', 
//   BLOCKCHAIN: 'BLOCKCHAIN'
// };

// class PubSub {
//   constructor(blockchain) {
//     this.blockchain = blockchain;

//     this.publisher = redis.createClient();
//     this.subscriber = redis.createClient();

//     this.subscribeToChannels();

//   }

//   async init() {
//     await this.publisher.connect();
//     await this.subscriber.connect();
//   }

//   subscribeToChannels() {
//     Object.values(CHANNELS).forEach(channel => {
//       this.subscriber.subscribe(channel, (message, channel) => {
//           console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
    
//           const parserMessage = JSON.parse(message);
    
//           if (channel === CHANNELS.BLOCKCHAIN) {
//             console.log(`Message was for channel ${CHANNELS.BLOCKCHAIN}`);
//           }
//       });
//     });
//   }

//   publish({ channel, message}){
//     this.publisher.publish(channel, message);
//   }

//   broadcastChain() {
//     this.publish({
//         channel: CHANNELS.BLOCKCHAIN,
//         message: JSON.stringify(this.blockchain.chain)
//     });
//   }
// }

// module.exports = PubSub;

const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST', 
  BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
  constructor(blockchain) {
    this.blockchain = blockchain;

    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscribeToChannels();

  }

  // Changed signature here, not sure what message and channel were doing here?
  //async init({channel, message}) {
  async init() {
    await this.publisher.connect();
    await this.subscriber.connect();
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach(channel => {
      // Added debug...
      // console.log(`Subscribing to ${channel}`);
      // Subscribe passing in the subscriber function... using
      // same function for all channels here.
      this.subscriber.subscribe(channel, (message, channel) => {
          console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
    
          // Do something with this according to your application logic...
          const parserMessage = JSON.parse(message);
    
          if (channel === CHANNELS.BLOCKCHAIN) {
            console.log(`Message was for channel ${CHANNELS.BLOCKCHAIN}`);
          }
      });
    });
  }

  publish({ channel, message}){
    this.publisher.publish(channel, message);
  }

  // I didn't use this as I don't know what this.blockchain.chain is.
  broadcastChain() {
    this.publish({
        channel: CHANNELS.BLOCKCHAIN,
        message: JSON.stringify(this.blockchain.chain)
    });
  }
}

const testPubSub = new PubSub();
testPubSub.init();
module.exports = PubSub;