const { gql } = require("apollo-server");

module.exports = gql`
    type Chat {
        id: Int!
        from: String!
        message: String!
    }
    type Notif {
        idUser: Int!
        notif: String!
    }
    type Query {
        chats: [Chat]
        notif: [Notif]
    }

    type Mutation {
        sendMessage(from: String!, message: String!): Chat
        addNotif(idUser: Int!, notif: String!): Notif
    }

    type Subscription {
        messageSent: Chat
        getNotif(idUser: Int!): [Notif]
    }
`;
