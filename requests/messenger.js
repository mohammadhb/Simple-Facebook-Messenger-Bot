const axios = require("axios");
const {
  request: {
    messenger: { config, access_token }
  }
} = require("../config");

const client = axios.create(config);

function markSeen(recipient) {
  const path = "/me/messages",
    data = {
      recipient: { id: recipient },
      sender_action: "mark_seen"
    },
    options = {
      params: { access_token }
    };

  return client.post(path, data, options);
}

function setTyping(recipient, state) {
  const path = "/me/messages",
    data = {
      recipient: { id: recipient },
      sender_action: state ? "typing_on" : "typing_off"
    },
    options = {
      params: { access_token }
    };

  return client.post(path, data, options);
}

function sendMessage(recipient, message, quickReplies) {
  const path = "/me/messages",
    data = {
      recipient: { id: recipient },
      message: {
        text: message,
        quick_replies: quickReplies
          ? quickReplies.map(quickReply => {
            return {
              content_type: "text",
              title: quickReply.key,
              payload: quickReply.value
            };
          })
          : undefined
      }
    },
    options = {
      params: { access_token }
    };

  return client.post(path, data, options);
}

async function sendMessageWithSeenAndTyping(recipient, message, quckReplies) {
  await markSeen(recipient);
  await setTyping(recipient, true);
  await sendMessage(recipient, message, quckReplies);
  await setTyping(recipient, false);
}

module.exports = {
  markSeen,
  setTyping,
  sendMessage,
  sendMessageWithSeenAndTyping
};
