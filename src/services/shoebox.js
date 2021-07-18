const fetch = require("node-fetch");
const config = require("config");

const { GoogleAuth } = require("google-auth-library");
const auth = new GoogleAuth();

const SERVICE_ENDPOINT = config.get("shoeboxServiceEndpoint");
let client;

async function postEntry(entry) {
  if (!client) client = await auth.getIdTokenClient(SERVICE_URL);
  const clientHeaders = await client.getRequestHeaders();

  let response = await fetch(SERVICE_URL, {
    method: "POST",
    headers: {
      Authorization: clientHeaders["Authorization"],
    },
    body: entry,
  });
  return await response.json();
}

module.exports = {
  postEntry,
};
