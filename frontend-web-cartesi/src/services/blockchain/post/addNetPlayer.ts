import { post } from "./post";
import { generateAndExportRSAKeyPair } from "../../../utils";

export const addNetPlayer = async (index: number) => {
    const { publicKey } = generateAndExportRSAKeyPair()
    console.log("publicKey", publicKey);
    return await post(publicKey, index);
}
