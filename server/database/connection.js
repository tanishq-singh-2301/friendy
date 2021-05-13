const firebase = require('firebase');

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

const connect = () => {
    firebase.initializeApp(firebaseConfig);

    var connectedRef = firebase.database().ref("game-infos/connected");
    connectedRef.on("value", (snap) => {
        if (snap.val() === true) console.log("The database is connected.");
        else console.log("The database is not connected.");
    });

    return firebase
}

module.exports = connect;