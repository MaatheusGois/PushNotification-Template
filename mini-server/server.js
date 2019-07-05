// "use strict";
const config = require('./config')
const apn = require('apn');

var options = {
  token: {
    // The path where stay our file .p8
    key: "./cert_notifications.p8",
    // Replace keyID and teamID with the values you've previously saved.
    keyId: config.keys.keyId,
    teamId: config.keys.teamId
  },
  production: false
};

function sendNotification(deviceToken, mensage, badge) {
    let apnProvider = new apn.Provider(options);

    // Prepare the notifications
    let notification = new apn.Notification();
    notification.expiry = Math.floor(Date.now() / 1000) + 24 * 3600; // will expire in 24 hours from now
    notification.badge = badge;
    notification.sound = "ping.aiff";
    notification.alert = mensage
    notification.payload = {'messageFrom': 'Gois'};

    // Replace this with your app bundle ID:
    notification.topic = "maatheusgois.PushNotification-Template";

    // Send the actual notification
    apnProvider.send(notification, deviceToken).then( result => {
        // Show the result of the send operation:
        console.log(result);
    });

    // Close the server
    apnProvider.shutdown();
}


// Replace deviceToken with your particular token:
let deviceToken = "2B16D2C84D4C6E2BE7926808FEB96A4E7A11A868B6BD1EAC411884831B5CA6EC"
let mensage = "\uD83D\uDCE7 \u2709 You have a new message";
let badge = 1


sendNotification(deviceToken, mensage, badge)


