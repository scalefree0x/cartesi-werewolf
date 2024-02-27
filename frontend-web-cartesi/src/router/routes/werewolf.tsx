import { Homepage } from "../../pages";
import { Route } from "../../types";


export const werewolf_routes: Route[] = [
    {
        path: '/',
        element: Homepage
    },
    {
        path: '*',
        element: () => <>404</>
    }
];