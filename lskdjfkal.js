const PubNub = require('pubnub');

const credentials = {
  PublishKey: 'pub-c-c6c18668-6698-4184-a10f-7fbee587d95e', 
  subscribeKey: 'sub-c-59a5a018-5a84-404a-9919-a3f0e097d2e4',
  secretKey: 'sec-c-YWQzZDczMjEtM2UwNi00NzNkLWE5MGUtMzNlMGJiNTI0ZGRm'

};

const CHANNELS ={
    TEST: 'TEST'
}

class PubSub{
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS)});

    this.pubnub.addListener({
      message: messageObject => {
        const { channel, message } = messageObject;
      }
    });
  }

  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
      }
    };
  }

  publish({ channel, message}) {
    this.pubnub.publish({ channel, message });
  }
}

module.exports = pubsub;