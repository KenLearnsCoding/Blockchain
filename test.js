const redis = require('redis');

const CHANNELS = {
    TEST: 'TEST'
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
        await this.subscriber.subscribe(CHANNELS.TEST, this.handleMessage)
    }
    handleMessage(message, channel) {
        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
        process.exit(0)
    }

}
const testPubSub = new PubSub();
setTimeout(() => {testPubSub.publisher.publish(CHANNELS.TEST, 'foo');}, 1000);