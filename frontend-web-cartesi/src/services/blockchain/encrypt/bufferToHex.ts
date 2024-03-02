export const bufferToHex = (jsonString: string) => {
    const buffer = Buffer.from(jsonString, 'utf-8');
    return buffer.toString('hex');
}