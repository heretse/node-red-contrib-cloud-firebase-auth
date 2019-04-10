# node-red-contrib-cloud-firebase-auth

Node-RED nodes to handle google cloud Firebase Authentication get user operations

## Install
Install from [npm](https://www.npmjs.com/package/node-red-contrib-cloud-firebase-auth)
```
npm install --save node-red-contrib-cloud-firebase-auth
```

Install from the palette manager
```
node-red-contrib-cloud-firebase-auth
```

## Usage
### Firebase admin
Required configuration node that initializes your firebase app taking in a name and the json contents of your apps service account credentials.

### Firebase Auth get user

The node fetches user record from Firebase Authentication.
Configurations can be made within the node or on the ``msg.firebase`` property:
- ``type``: [string] An enum in ``uid``, ``email`` or ``phone``
- ``query``: [string] The query value for fetching user record

Response user record from the operation is output through the ``msg.payload`` property

## TODO

- Create and update user operations