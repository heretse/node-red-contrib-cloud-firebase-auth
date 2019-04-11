function validateNodeConfig(n) {
    if (!n.admin) {
        throw "No admin specified";
    }
}

module.exports = function(RED) {
    "use strict";

    function FirebaseAuthGetUser(n) {
        validateNodeConfig(n)

        RED.nodes.createNode(this, n);
        var node = this;

        node.queryType = n.queryType;
        node.queryValue = n.queryValue;
        node.admin = RED.nodes.getNode(n.admin);

        node.on('input', msg => {

            var queryType = node.queryType;

            if (msg.payload && msg.payload.firebase && msg.payload.firebase.type) {
                queryType = msg.payload.firebase.type;
            }

            var queryValue = node.queryValue;

            if (msg.payload && msg.payload.firebase && msg.payload.firebase.query) {
                queryValue = msg.payload.firebase.query;
            }

            var getUserPromise;

            switch (queryType) {
                case "uid":
                    getUserPromise = node.admin.auth.getUser(queryValue);
                    break;
                case "email":
                    getUserPromise = node.admin.auth.getUserByEmail(queryValue);
                    break;
                case "phone":
                    getUserPromise = node.admin.auth.getUserByPhoneNumber(queryValue);
                    break;
                default:
                    break;
            }

            node.status({ fill: "blue", shape: "dot", text: "Fetching user data..." });

            if (getUserPromise) {
                getUserPromise.then((userRecord) => {
                    msg.payload = userRecord;
                    node.send(msg);
                    node.status({});
                }).catch(function(error) {
                    node.error(error);
                    msg.payload = null;
                    node.send(msg);
                    node.status({ fill: "red", shape: "ring", text: "Error fetching user data" });
                });
            } else {
                node.error("Unknown query type");
                node.status({ fill: "red", shape: "ring", text: "Unknown query type" });
            }

        })

        node.on('close', done => {

        })
    }

    RED.nodes.registerType("firebase-auth-get-user", FirebaseAuthGetUser);
}