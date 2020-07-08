require('dotenv').config({ path: 'variables.env' });

var crypto = require('crypto');
const webpush = require('web-push');
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
    'mailto:my_gmail@gmail.com',
    publicVapidKey,
    privateVapidKey
);

function createHash(input) {
    const md5sum = crypto.createHash('md5');
    md5sum.update(Buffer.from(input));
    return md5sum.digest('hex');
}

function handleSubscription(req, res) {
    const subscriptionRequest = req.body.data;
    const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    subscriptions[susbscriptionId] = subscriptionRequest;
    res.status(201).json({ id: susbscriptionId });
}

function sendPushNotification(req, res) {
    const subscriptionId = req.params.id;
    const pushSubscription = subscriptions[subscriptionId];
    webpush.sendNotification(
        pushSubscription,
        JSON.stringify({
          title: 'Hello!',
          text: 'This is a test',
          image: '',
          tag: 'new',
          url: '/next_page.html'
        })
    )
    .catch((err) => {
        console.log(err);
    });
  
    res.status(202).json({});
}

module.exports = { handleSubscription, sendPushNotification };