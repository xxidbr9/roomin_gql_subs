const chats = [];
const allNotif = [];
const otherNotif = [];

const CHAT_CHANNEL = "CHAT_CHANNEL";
// const NOTIF = "NOTIF";
const OTHER_NOTIF = "OTHER_NOTIF";
const NONE = "NOEN";

module.exports = {
    Query: {
        chats(root, args, context) {
            return chats;
        },
        notif(root, args, contex) {
            return notif;
        }
    },

    Mutation: {
        sendMessage(root, { from, message }, { pubsub }) {
            const chat = { id: chats.length + 1, from, message };

            chats.push(chat);

            /*             
            ? untuk chaneling
            ? jadi tinggal ganti aja ke chanel yang di buat di BE 
            */

            pubsub.publish("CHAT_CHANNEL", { messageSent: chat });

            return chat;
        },
        addNotif(root, { idUser, notif }, { pubsub }) {
            const rawNotif = { id: allNotif.length + 1, idUser, notif };
            allNotif.push(rawNotif);

            const NOTIF = `isNotif_from_${idUser}`;
            const notf = pubsub.publish(NOTIF, { getNotif: allNotif });
            // console.log("ini dari notif mutate", notf);

            const other = { id: otherNotif.length + 1, idUser, notif: "Babi" };
            otherNotif.push(other);
            pubsub.publish(OTHER_NOTIF, { getNotif: other });

            return rawNotif;
        }
    },

    Subscription: {
        messageSent: {
            subscribe: (root, args, { pubsub }) => {
                return pubsub.asyncIterator(CHAT_CHANNEL);
            }
        },
        getNotif: {
            subscribe: (root, { idUser }, { pubsub }) => {
                // console.log(pubsub.subscribe(NOTIF, { ok: "mantap" }));
                // if (args.idUser == 1) {
                // console.log("dari sub", pubsub.asyncIterator(NOTIF));
                const NOTIF = `isNotif_from_${idUser}`;
                return pubsub.asyncIterator(NOTIF);
            }
        }
    }
};
