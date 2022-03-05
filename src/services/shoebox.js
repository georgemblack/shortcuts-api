const fetch = require("node-fetch");
const config = require("config");

const { GoogleAuth } = require("google-auth-library");
const auth = new GoogleAuth();

const SERVICE_URL = config.get("shoeboxServiceEndpoint");
let client;

async function postEntry(entry) {
  if (!client) client = await auth.getIdTokenClient(SERVICE_URL);
  const clientHeaders = await client.getRequestHeaders();

  const response = await fetch(`${SERVICE_URL}/api/entries`, {
    method: "POST",
    headers: {
      Authorization: clientHeaders["Authorization"],
    },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    throw "Failed to call Shoebox API!";
  }
}

module.exports = {
  postEntry,
};
