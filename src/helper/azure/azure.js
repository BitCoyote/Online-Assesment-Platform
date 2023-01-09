const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

export const creatingSecret = () => {

    const credential = new DefaultAzureCredential();

    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;

    const client = new SecretClient(url, credential);

    const secretName = "MySecretName";

    client.setSecret(secretName, "MySecretValue").then(res => { return res; });
}

export const gettingSecret = () => {

    const credential = new DefaultAzureCredential();

    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;

    const client = new SecretClient(url, credential);

    const secretName = "MySecretName";

    client.getSecret(secretName).then(latestSecret => {
        return getSecret;
    })
}