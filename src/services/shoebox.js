const fetch = require("node-fetch");
const config = require("config");

const { GoogleAuth } = require("google-auth-library");
const auth = new GoogleAuth();

const SERVICE_URL = config.get("shoeboxServiceEndpoint");
let client;

async function postEntry(entry) {
  if (!client) client = await auth.getIdTokenClient(SERVICE_URL);
  const clientHeaders = await client.getRequestHeaders();

  await fetch(`${SERVICE_URL}/entries`, {
    method: "POST",
    headers: {
      Authorization: clientHeaders["Authorization"],
    },
    body: JSON.stringify(entry),
  });
}

module.exports = {
  postEntry,
};
