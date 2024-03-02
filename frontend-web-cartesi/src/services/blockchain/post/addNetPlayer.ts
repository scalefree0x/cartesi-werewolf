import { post } from "./post";
import { inspect } from "../inspect";
import { generateAndExportRSAKeyPair } from "../../../utils";


export const addNetPlayer = async (index: number) => {
    const { publicKey } = generateAndExportRSAKeyPair()
    console.log("publicKey", publicKey);
    return post(publicKey, index).then(async (res) => {
        console.log('post request response', res);
        const state = await inspect("");
        console.log('app state post player add', state);
        console.log('state', state);
        return state;
    });
}
