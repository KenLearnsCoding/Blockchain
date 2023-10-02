const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST'
};

class PubSub {
  constructor() {
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();
  }

  async init() {
    // Connect to Redis... async/await/Promises not allowed
    // in contstructor so do it here.
    await this.publisher.connect();
    await this.subscriber.connect();

    this.subscriber.subscribe(CHANNELS.TEST, (message, channel) => {
        console.log(`Channel: ${channel}`);
        console.log(`Message: ${message}`);
    });
  }
}

const testPubSub = new PubSub();
testPubSub.init();
setInterval(() => {
  testPubSub.publisher.publish(CHANNELS.TEST, 'foo');
  console.log('Published...');
}, 1000);