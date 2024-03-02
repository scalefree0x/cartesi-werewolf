import { post } from "./post";
import { inspect } from "../inspect";
import { generateAndExportRSAKeyPair } from "../../../utils";
import { toast } from "react-toastify";


export const addNetPlayer = async (wallet_public_key: string) => {
    const { publicKey } = generateAndExportRSAKeyPair()
    console.log("publicKey", publicKey);
    return post(publicKey, wallet_public_key).then(async (res) => {
        console.log('post request response', res);
        const state = await inspect("");
        console.log('app state post player add', state);
        console.log('state', state);
        return state;
    });
}
