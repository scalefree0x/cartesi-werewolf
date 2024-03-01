import { post } from "./post";
import { inspect } from "../inspect";
import { generateAndExportRSAKeyPair } from "../../../utils";


export const addNetPlayer = async (e: any) => {
    const { publicKey } = generateAndExportRSAKeyPair()
    return post(publicKey).then((res) => {
        console.log('res', res);
        const state = inspect("");
        console.log('app state post player add');
        console.log('state', state);
        return state;
    });
}
