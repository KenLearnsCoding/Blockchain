// const redis = require('redis');


// const CHANNELS = {
//     TEST: 'TEST', 
//     BLOCKCHAIN: 'BLOCKCHAIN'
// };

// class PubSub {
//     constructor({ blockchain }) {
//         this.blockchain = blockchain;

//         this.publisher = redis.createClient();
//         this.subscriber = redis.createClient();
//         this.init()
//     }

//     async init() {
//         await this.publisher.connect()
//         await this.subscriber.connect()

//         this.subscribeToChannels();
//         // await this.subscriber.subscribe(Object.values(CHANNELS), this.handleMessage);
//     }
//     handleMessage(channel, message){
//         console.log(`Message received. Channel: ${message}. Message: ${channel}`);

//         const parsedMessage = JSON.parse(message);

//         if (channel === CHANNELS.BLOCKCHAIN) {
//           this.blockchain.replaceChain(parsedMessage);
//         }
//     }

//     subscribeToChannels() {
//       Object.values(CHANNELS).forEach(channel => {
//         this.subscriber.subscribe(channel, this.handleMessage)
//       });
//     }

//     publish({ channel, message }) {
//       this.publisher.publish(channel, message);
//     };

//     broadcastChain() {
//       this.publish({
//         channel: CHANNELS.BLOCKCHAIN,
//         message: JSON.stringify(this.blockchain.chain)
//       });
//     }

// }
// module.exports = PubSub;

