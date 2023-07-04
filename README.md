# Messenger
Real Time Messenger supporting Authentication and real time chat between users.

## Firebase 

The Firebase configuration object has not been shared due to private nature of the information.\
However you can simply add the objects by following these steps\
Add Firebase Services by following these steps: 

In the frontend part (i.e in the `messenger` directory) `firebase` is required, whereas for backend (i.e in `server` directory) `firebase-admin` is required.\
These will be automatically installed by the `npm install` command.

You need a Google Account for the following.

### Firebase Authentication

#### For the client side 
Follow the steps given here: [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup) to create a project in firebase.

While registering, the configuration object will be provided, which should be put into the `messenger/src/firebase-config.js` file.

#### For the server side
Follow the steps given here: [Add Firebase-Admin SDK to your JavaScript project](https://firebase.google.com/docs/admin/setup#prerequisites) to create service account.\
During the setup process, A private key for the service account will be generated which has to be linked to the `server\firebase-config.js` file.\
The path to the file must be provided in the file.(Marked in the file).
