const redis = require('redis');

const CHANNELS = {
    TEST: 'TEST', 
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
    constructor() {
        this.publisher = redis.createClient();
        this.subscriber = this.publisher.duplicate()
        this.init()
    }

    async init() {
        await this.publisher.connect()
        await this.subscriber.connect()

        // this.subscribeToChannels();
        // await this.subscriber.subscribe(CHANNELS.TEST, this.handleMessage)
        await this.subscriber.subscribe(Object.values(CHANNELS), this.handleMessage);
    }
    handleMessage(channel, message){
        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
        process.exit(0)
    }

    // subscribeToChannels() {
    //   Object.values(CHANNELS).forEach(channel => {
    //     this.subscriber.subscribe(channel, this.handleMessage);
    //   });
    // }

}
const testPubSub = new PubSub();
setTimeout(() => {testPubSub.publisher.publish(CHANNELS.TEST, 'foo');}, 1000);