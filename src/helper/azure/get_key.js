const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  const credential = new DefaultAzureCredential();

  const keyVaultName = "ngen-tlp-key-vault";
  const url = "https://" + keyVaultName + ".vault.azure.net";

  const client = new SecretClient(url, credential);

  // Create a secret
  // The secret can be a string of any kind. For example,
  // a multiline text block such as an RSA private key with newline characters,
  // or a stringified JSON object, like `JSON.stringify({ mySecret: 'MySecretValue'})`.
  const uniqueString = new Date().getTime();
  const secretName = `ngenjwt`;
  // const result = await client.setSecret(secretName, "knowmeq1");
  // console.log("result: ", result);

  // Read the secret we created
  const secret = await client.getSecret(secretName);
  console.log("secret: ", secret.value);
  const fs = require('fs');
  fs.writeFileSync('.env', 'REACT_APP_SECRET_VALUE=' + secret.value);

  // // Update the secret with different attributes
  // const updatedSecret = await client.updateSecretProperties(secretName, result.properties.version, {
  //   enabled: false
  // });
  // console.log("updated secret: ", updatedSecret);

  // // Delete the secret
  // // If we don't want to purge the secret later, we don't need to wait until this finishes
  // await client.beginDeleteSecret(secretName);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});