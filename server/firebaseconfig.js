const admin = require('firebase-admin');
// Modify the path in the `require()` to your private key file 
const serviceAccount = require('<YOUR-FILE_PATH>');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = {admin};
