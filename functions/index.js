const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.onUserSignup = functions.auth.user().onCreate(async (user) => {
  await fetch("https://aric.app.n8n.cloud/webhook/new-signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      createdAt: user.metadata.creationTime,
    }),
  });
});
