'use strict'

const UserController = require('./src/controllers/user.controller');
const mongoConfig = require('./configs/mongoConfig');
const firebaseApp = require('firebase/app')
const app = require('./configs/app');
const port = 3200 || process.env.PORT;

const firebaseConfig = {
    apiKey: "AIzaSyDEGjG1lVGagd_2QkPL4YUIk8ekjeiY6L0",
    authDomain: "v7c3n-cont.firebaseapp.com",
    projectId: "v7c3n-cont",
    storageBucket: "v7c3n-cont.appspot.com",
    messagingSenderId: "577179081114",
    appId: "1:577179081114:web:174df4ff70292f9e64c223",
    measurementId: "G-VBFGZCRKMJ"
};

mongoConfig.init();
UserController.createAdmin();
const appFirebase = firebaseApp.initializeApp(firebaseConfig);

app.listen(port, () => {
    console.log(`Server start in port ${port}`);
});