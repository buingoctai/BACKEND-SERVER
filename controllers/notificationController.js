/**
 * This controller use for working with service worker.
 */

const constants = require("../utils/constants");
const uuidv4 = require("uuid/v4");
const subscriptions = {};
var crypto = require('crypto');
const webpush = require('web-push');

const vapidKeys = {
  privateKey: 'bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU',
  publicKey:
    'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8'
};

const {
    GET_ALL_SUBSCRITION,
    INSERT_SUBSCRITION,
} = constants;

webpush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);

// function createHash(input) {
//     const md5sum = crypto.createHash('md5');
//     md5sum.update(Buffer.from(input));
//     return md5sum.digest('hex');
// }

exports.handlePushNotificationSubscription = (req, res) => {
    // const subscriptionRequest = req.body.data;
    // const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    // subscriptions[susbscriptionId] = subscriptionRequest;
    // res.status(201).json({ id: susbscriptionId });
    const data = req.body.data;
    var id_value = uuidv4();
    var subscription_value = data;
    sql.connect(DATABASE_SERVER_CONFIG_DEV, (err) => {
        if (err) res.status(500).send(err);
        const request = new sql.Request();
        request.query(
            INSERT_SUBSCRITION
                .replace("id_value", id_value)
                .replace("subscription_value", subscription_value),
            (err) => {
                if (err) {
                res.status(500).send();
                }
            }
        );
    });
  
    res.status(201).body('ok');
}
  
exports.sendPushNotification = (req, res) => {
    // const subscriptionId = req.params.id;
    // const pushSubscription = Object.values(subscriptions)[0];
    // console.log({pushSubscription})
    // if (pushSubscription){
    //     webpush
    //         .sendNotification(
    //             pushSubscription,
    //             JSON.stringify({
    //                 title: 'Test',
    //                 text: 'Some new data is here!!!',
    //                 tag: 'new',
    //                 url: '/one_page.html'
    //             })
    //         )
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }
    // else 
    //     console.error('No subscription found!')
    // res.status(202).json({})
    sql.connect(DATABASE_SERVER_CONFIG_DEV, (err) => {
        if (err) res.status(500).send(err);
        const request = new sql.Request();
        request.query(GET_ALL_SUBSCRITION, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.json(err);
            }
            for (i in data){
                webpush
                    .sendNotification(
                        data[i],
                        JSON.stringify({
                            title: 'Test',
                            text: 'Some new data is here!!!',
                            tag: 'new',
                            url: '/one_page.html'
                        })
                    )
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    })
    
}
