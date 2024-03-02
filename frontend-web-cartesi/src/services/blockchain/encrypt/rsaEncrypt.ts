import forge from 'node-forge';

export const rsaEncrypt = (role: string, public_key: string) => {
    const publicKeyForge = forge.pki.publicKeyFromPem(public_key);
    const encrypted = publicKeyForge.encrypt(role, 'RSA-OAEP');
    return forge.util.encode64(encrypted);
}