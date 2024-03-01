import { hex2str } from "../../../utils";

export const inspect = async (args: any) => {
    const { url, payload } = args;
    try {
        const response = await fetch(`${url}/${payload}`);
        if (response.status == 200) {
            const result = await response.json();
            for (let i in result.reports) {
                let payload = result.reports[i].payload;
                let pl = JSON.parse(hex2str(payload));
                return pl;
            }
            if (result.exception_payload) {
                let payload = result.exception_payload;
                let pl = JSON.parse(hex2str(payload));
                return pl
            }
        }
        else {
            return JSON.stringify(await response.text());
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};