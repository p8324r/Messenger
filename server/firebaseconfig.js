const admin = require('firebase-admin');
// Modify the path in the `require()` to your private key file 
const serviceAccount = require('./Privatekey/messenger-332fe-firebase-adminsdk-j2238-08d9210514.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = {admin};
