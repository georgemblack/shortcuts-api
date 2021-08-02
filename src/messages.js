const HAPPY_RESPONSE_MESSAGES = ["Nice my guy!", "🤙🏻", "👉🏻😎👉🏻"];
const SAD_RESPONSE_MESSAGES = ["Major yikes!"];

function happyResponseMessage() {
  return HAPPY_RESPONSE_MESSAGES[
    Math.floor(Math.random() * HAPPY_RESPONSE_MESSAGES.length)
  ];
}

function sadResponseMessage() {
  return SAD_RESPONSE_MESSAGES[
    Math.floor(Math.random() * SAD_RESPONSE_MESSAGES.length)
  ];
}

module.exports = {
  happyResponseMessage,
  sadResponseMessage,
};
