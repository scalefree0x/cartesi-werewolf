import { Game, Homepage } from "../../pages";
import { Route } from "../../types";


export const werewolf_routes: Route[] = [
    {
        path: '/',
        element: Homepage
    },
    {
        path: '/werewolf',
        element: Game,
    },
    {
        path: '*',
        element: () => <>404</>
    }
];