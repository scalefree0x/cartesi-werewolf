const forge = require('node-forge');

export const generateAndExportRSAKeyPair = () => {
    const rsaKeyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

    const privateKeyDer = forge.pki.privateKeyToAsn1(rsaKeyPair.privateKey);
    const publicKeyDer = forge.pki.publicKeyToAsn1(rsaKeyPair.publicKey);

    return {
        privateKey: forge.asn1.toDer(privateKeyDer).getBytes(),
        publicKey: forge.asn1.toDer(publicKeyDer).getBytes()
    };
}