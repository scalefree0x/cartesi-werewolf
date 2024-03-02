import forge from 'node-forge';

export const rsaDecrypt = (encryptedHex: string, privateKey: string) => {
    const privateKeyForge = forge.pki.privateKeyFromPem(privateKey);
    const encryptedBytes = forge.util.decode64(encryptedHex);
    const decryptedBytes = privateKeyForge.decrypt(encryptedBytes, 'RSA-OAEP');
    return forge.util.decodeUtf8(decryptedBytes);
}