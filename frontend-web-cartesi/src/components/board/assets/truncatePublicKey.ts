
export const truncatePublicKey = (public_key: string) => {
    return public_key.slice(0, 4) + "..." + public_key.slice(public_key.length - 4);
}